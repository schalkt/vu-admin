<template>
    <div v-cloak class="vu-admin-app" :class="settings.container">

        <header :class="settings.header.class" :data-bs-theme="settings.header.theme || null">
            <a v-if="logo || settings.title" class="navbar-brand d-flex align-items-center me-3" :class="settings.brand.class" :href="safeUrl(settings.brand.href)">
                <img v-if="logo" :src="logo" :alt="translate(settings.title || '')" :height="settings.brand.height || null"
                    :width="settings.brand.width || null" class="d-inline-block" :class="{ 'me-2': settings.title }">
                <span v-if="settings.title">{{ translate(settings.title) }}</span>
            </a>
            <vu-admin-nav v-model="auth" :url="settings.nav.url || undefined" :menu="settings.nav.menu || undefined"></vu-admin-nav>
            <vu-user-button v-if="!session" v-model="auth" :panel="'registration'"></vu-user-button>
            <vu-user-button v-model="auth" :panel="'login'"></vu-user-button>
        </header>

        <main :class="settings.main.class">
            <!-- stored session is being restored (profile request): instead of an empty, signed-out looking page -->
            <div v-if="restoring" class="vu-admin-app-loading d-flex justify-content-center align-items-center py-5 text-secondary">
                <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                <span>{{ translate('Loading...') }}</span>
            </div>
            <vu-admin :auth="auth"></vu-admin>
        </main>

        <vu-auth v-if="!session" v-model="auth" :settings="'auth'"></vu-auth>

    </div>
</template>

<script>
import VuAdmin from "./VuAdmin.vue";
import VuAuth from "./VuAuth.vue";
import VuUserButton from "./VuUserButton.vue";
import VuAdminNav from "./VuAdminNav.vue";
import { safeUrl, translate } from "./helpers";
import { getLanguage, LANGUAGE_CHANGE_EVENT } from "../i18n.js";

// window.VuSettings.app – every key is optional
const DEFAULTS = {
    // page name: the brand text and the browser tab title (translation key)
    title: "",
    // tab title; {title} = page name, {view} = active view (entity) name; can be a function: (title, view) => string
    documentTitle: "{view} | {title}",
    // brand logo URL (relative, http(s) or data:image)
    logo: "",
    // favicon URL (empty → the one in the HTML stays)
    favicon: "",
    brand: {
        href: "#",
        class: "",
        height: 28,
        width: null,
    },
    container: "container-fluid",
    header: {
        class: "sticky-top navbar navbar-expand p-2 border shadow bg-light",
        // Bootstrap theme of the header only (e.g. 'dark'), empty → inherited
        theme: "",
    },
    main: {
        class: "",
    },
    nav: {
        // VuAdminNav: empty → `${__VU_ADMIN_PREFIX__}/api/navs`
        url: "",
        menu: "admin",
    },
};

// defaults + window.VuSettings.app; nested objects (brand, header, ...) can be overridden key by key
function mergeSettings(defaults, custom) {
    const result = {};
    Object.keys(defaults).forEach((key) => {
        const value = defaults[key];
        result[key] = value && typeof value === "object" ? Object.assign({}, value) : value;
    });
    Object.keys(custom || {}).forEach((key) => {
        const value = custom[key];
        const isPlain = value && typeof value === "object" && !Array.isArray(value);
        result[key] = isPlain && result[key] && typeof result[key] === "object" ? Object.assign(result[key], value) : value;
    });
    return result;
}

function hasStoredSession() {
    try {
        return !!(localStorage.getItem("vu-user") && localStorage.getItem("vu-header"));
    } catch (e) {
        return false;
    }
}

const VuAdminApp = {
    name: "VuAdminApp",
    props: {
        // a ready session instead of the built-in sign-in (e.g. a demo, or an app that signs in elsewhere):
        // { success: true, user: {...}, header: {...}, settings: { entities, dashboard } }
        // the auth modal and the register button are not rendered, nothing is read from / written to localStorage
        session: {
            type: Object,
            default: null,
        },
    },
    data() {
        const custom = typeof window !== "undefined" && window.VuSettings && window.VuSettings.app ? window.VuSettings.app : {};
        return {
            auth: this.session || { inputs: {} },
            settings: mergeSettings(DEFAULTS, custom),
            language: getLanguage(),
            hash: typeof window !== "undefined" ? window.location.hash : "",
            // a stored session exists: VuAuth restores it (profile request) and then sends the auth object
            restoring: !this.session && hasStoredSession(),
        };
    },
    computed: {
        logo() {
            return safeUrl(this.settings.logo);
        },
        view() {
            const route = decodeURIComponent(this.hash.replace(/^#\/?/, "").split("?")[0]);
            const entities = this.auth && this.auth.settings && this.auth.settings.entities ? this.auth.settings.entities : {};
            if (!route || !entities[route]) {
                return "";
            }
            const config = entities[route];
            return typeof config === "object" && config.title ? config.title : route.charAt(0).toUpperCase() + route.slice(1);
        },
        documentTitle() {
            const title = this.translate(this.settings.title || "");
            const view = this.view ? this.translate(this.view) : "";
            const template = this.settings.documentTitle;

            if (typeof template === "function") {
                return template(title, view);
            }
            if (!view || !template) {
                return title;
            }
            return String(template).replace("{title}", title).replace("{view}", view).replace(/^\s*\|\s*|\s*\|\s*$/g, "");
        },
    },
    watch: {
        // VuAuth sends the auth object after the restore (success or sign out)
        auth() {
            this.restoring = false;
        },
        session(value) {
            if (value) {
                this.auth = value;
            }
        },
        documentTitle: {
            immediate: true,
            handler(value) {
                if (value && typeof document !== "undefined") {
                    document.title = value;
                }
            },
        },
    },
    created() {
        this.setFavicon(this.settings.favicon);
        if (this.restoring) {
            // never spin forever (e.g. VuAuth missing / misconfigured)
            this._restoreTimeout = setTimeout(() => {
                this.restoring = false;
            }, 15000);
        }
    },
    mounted() {
        this._onLanguageChange = (event) => {
            this.language = event.detail.language;
        };
        this._onHashChange = () => {
            this.hash = window.location.hash;
        };
        window.addEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        window.addEventListener("hashchange", this._onHashChange);
    },
    beforeUnmount() {
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        window.removeEventListener("hashchange", this._onHashChange);
        clearTimeout(this._restoreTimeout);
    },
    methods: {
        safeUrl,
        translate(key) {
            return translate(key, null, null, this.language);
        },
        setFavicon(url) {
            const href = safeUrl(url);
            if (!href || typeof document === "undefined") {
                return;
            }
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement("link");
                link.rel = "icon";
                document.head.appendChild(link);
            }
            link.href = href;
        },
    },
    components: {
        VuAdmin,
        VuAuth,
        VuUserButton,
        VuAdminNav,
    },
};

export default VuAdminApp;
export { VuAdminApp };
</script>
