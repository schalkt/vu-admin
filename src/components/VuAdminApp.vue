<template>
    <div v-cloak class="vu-admin-app" :class="settings.container">

        <!-- signed out: no header, the page name in the middle with the sign in button and the registration link -->
        <div v-if="landing" class="vu-admin-landing position-relative d-flex flex-column justify-content-center align-items-center text-center"
            :class="settings.landing.class">
            <!-- language switch (more than one language offered, landing.languages !== false) -->
            <div v-if="landingLanguages.length > 1" class="vu-admin-landing-languages position-absolute top-0 end-0 p-3 d-flex gap-1">
                <button v-for="item in landingLanguages" :key="item.value" type="button" class="btn btn-sm"
                    :class="item.value == language ? 'btn-secondary' : 'btn-outline-secondary'" :title="item.label"
                    :aria-label="item.label" :aria-pressed="item.value == language ? 'true' : 'false'" @click="changeLanguage(item.value)">
                    {{ item.short || item.value.toUpperCase() }}
                </button>
            </div>
            <img v-if="logo" :src="logoFor(pageTheme).src" :style="logoFor(pageTheme).style" alt=""
                :height="settings.landing.logoHeight || null" class="vu-admin-landing-logo mb-3">
            <h1 v-if="settings.title" class="vu-admin-landing-title h3 mb-2">{{ translate(settings.title) }}</h1>
            <p v-if="settings.landing.text" class="vu-admin-landing-text text-secondary mb-0" v-html="translate(settings.landing.text)"></p>
            <button type="button" class="vu-admin-landing-sign-in mt-4" :class="settings.landing.buttonClass" @click="openAuth('login')">
                <i v-if="settings.landing.buttonIcon" :class="settings.landing.buttonIcon"></i>{{ translate(settings.landing.signIn) }}
            </button>
            <p v-if="registrationEnabled" class="vu-admin-landing-register small mt-3 mb-0">
                <span v-if="settings.landing.registerText" class="text-secondary me-1">{{ translate(settings.landing.registerText) }}</span>
                <a href="#" class="text-decoration-none" @click.prevent="openAuth('registration')">{{ translate(settings.landing.register) }}</a>
            </p>
        </div>

        <header v-else :class="settings.header.class" :data-bs-theme="headerTheme">
            <a v-if="logo || settings.title" class="navbar-brand d-flex align-items-center me-3" :class="settings.brand.class" :href="safeUrl(settings.brand.href)">
                <img v-if="logo" :src="logoFor(headerTheme || pageTheme).src" :style="logoFor(headerTheme || pageTheme).style"
                    :alt="translate(settings.title || '')" :height="settings.brand.height || null"
                    :width="settings.brand.width || null" class="d-inline-block" :class="{ 'me-2': settings.title }">
                <span v-if="settings.title">{{ translate(settings.title) }}</span>
            </a>
            <vu-admin-nav v-model="auth" :url="settings.nav.url || undefined" :menu="settings.nav.menu || undefined"
                :source="settings.nav.source || undefined" :groups="settings.nav.groups || undefined"></vu-admin-nav>
            <vu-user-button v-model="auth" :panel="'login'"></vu-user-button>
        </header>

        <main v-if="!landing" :class="settings.main.class">
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
import { availableLanguages, getLanguage, setLanguage, LANGUAGE_CHANGE_EVENT } from "../i18n.js";
import { getTheme, resolveTheme, THEME_CHANGE_EVENT } from "../theme.js";

// window.VuSettings.app – every key is optional
const DEFAULTS = {
    // page name: the brand text and the browser tab title (translation key)
    title: "",
    // tab title; {title} = page name, {view} = active view (entity) name; can be a function: (title, view) => string
    documentTitle: "{view} | {title}",
    // brand logo URL (relative, http(s) or data:image)
    logo: "",
    // logo in the dark theme: an own URL, or 'invert' (the logo with inverted colors, for a one-color dark logo);
    // empty → the logo is used as it is
    logoDark: "",
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
        // bg-body-tertiary follows the light / dark theme (bg-light would stay light in dark mode)
        class: "sticky-top navbar navbar-expand p-2 border shadow bg-body-tertiary",
        // Bootstrap theme of the header only (e.g. 'dark'), empty → inherited
        theme: "",
    },
    main: {
        class: "",
    },
    // the page while signed out (no header): logo, title, text, sign in button, registration link;
    // enabled: false → the header with the sign in / register buttons, as before
    landing: {
        enabled: true,
        class: "min-vh-100 py-5",
        logoHeight: 64,
        // optional line under the title (translation key, HTML)
        text: "",
        signIn: "Sign in",
        buttonClass: "btn btn-primary btn-lg px-5",
        buttonIcon: "bi bi-box-arrow-in-right me-2",
        registerText: "Don't have an account?",
        register: "Register",
        // language switch in the top right corner (when more than one language is offered)
        languages: true,
    },
    nav: {
        // 'api' (backend, default) | 'entities' (auth.settings.entities) | 'merge' (both)
        source: "api",
        // VuAdminNav: empty → `${__VU_ADMIN_PREFIX__}/api/navs`
        url: "",
        menu: "admin",
        // dropdown groups of the entity menu: { Content: { icon, class, order } }
        groups: null,
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
            themeChoice: getTheme(),
            // bumped on every theme event: 'auto' resolves again when the OS switches
            themeTick: 0,
        };
    },
    computed: {
        // signed out (not while a stored session is being restored, never with a fixed session)
        landing() {
            return !this.session && !this.restoring && this.settings.landing.enabled !== false && !(this.auth && this.auth.user);
        },
        // the theme of the page: the user's choice, else the theme set on the document, else light
        pageTheme() {
            this.themeTick;
            const documentTheme = typeof document !== "undefined" ? document.documentElement.getAttribute("data-bs-theme") : null;
            return resolveTheme(this.themeChoice) || (documentTheme === "dark" ? "dark" : "light");
        },
        landingLanguages() {
            return this.settings.landing.languages === false ? [] : availableLanguages();
        },
        // window.VuSettings.auth.registrationEnabled: false → no registration link
        registrationEnabled() {
            const auth = typeof window !== "undefined" && window.VuSettings ? window.VuSettings.auth : null;
            return !(auth && auth.registrationEnabled === false);
        },
        // the user's theme choice wins over header.theme
        headerTheme() {
            this.themeTick;
            return resolveTheme(this.themeChoice) || this.settings.header.theme || null;
        },
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
        this._onThemeChange = (event) => {
            this.themeChoice = event.detail.theme;
            this.themeTick++;
        };
        window.addEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        window.addEventListener(THEME_CHANGE_EVENT, this._onThemeChange);
        window.addEventListener("hashchange", this._onHashChange);
    },
    beforeUnmount() {
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        window.removeEventListener(THEME_CHANGE_EVENT, this._onThemeChange);
        window.removeEventListener("hashchange", this._onHashChange);
        clearTimeout(this._restoreTimeout);
    },
    methods: {
        safeUrl,
        changeLanguage(language) {
            setLanguage(language);
        },
        // the logo in a theme: { src, style }; logoDark: an own URL or 'invert'
        logoFor(theme) {
            const dark = this.settings.logoDark;
            if (theme === "dark" && dark) {
                if (dark === "invert") {
                    return { src: this.logo, style: { filter: "invert(1)" } };
                }
                const src = safeUrl(dark);
                if (src) {
                    return { src, style: null };
                }
            }
            return { src: this.logo, style: null };
        },
        // opens the VuAuth panel ('login' | 'registration')
        openAuth(panel) {
            this.auth.panel = panel;
            this.auth.visible = true;
        },
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
