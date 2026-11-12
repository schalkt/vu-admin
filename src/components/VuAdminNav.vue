<template>
    <ul v-cloak v-if="auth && auth.success && visibleItems.length" class="navbar-nav me-auto mb-2 mb-lg-0" :class="menuClass">
        <template v-for="(item, index) in visibleItems" :key="index">
            <li v-if="item.items && item.items.length" class="nav-item dropdown">
                <button class="btn dropdown-toggle" :class="[item.class, { active: hasActiveChild(item) }]" type="button" data-bs-toggle="dropdown">
                    <i v-if="iconClass(item.icon)" :class="iconClass(item.icon)"></i>
                    <span>{{ translate(item.name) }}</span>
                </button>
                <ul class="dropdown-menu">
                    <li v-for="(subitem, subindex) in visibleChildren(item)" :key="subindex">
                        <!-- grouping: { "header": "Title" } = group header, { "divider": true } = divider -->
                        <hr v-if="subitem.divider" class="dropdown-divider">
                        <h6 v-else-if="subitem.header" class="dropdown-header" :class="subitem.class">
                            <i v-if="iconClass(subitem.icon)" :class="iconClass(subitem.icon)"></i>
                            {{ translate(subitem.header) }}
                        </h6>
                        <button v-else-if="subitem.api" type="button" class="dropdown-item" :class="subitem.class" :disabled="running" @click="runAction(subitem)">
                            <i v-if="iconClass(subitem.icon)" :class="iconClass(subitem.icon)"></i>
                            {{ translate(subitem.name) }}
                        </button>
                        <a v-else class="dropdown-item" :class="[subitem.class, { active: isActive(subitem) }]" :aria-current="isActive(subitem) ? 'page' : null" :target="subitem.target || ''" :rel="subitem.target === '_blank' ? 'noopener noreferrer' : null" :href="safeUrl(subitem.href)">
                            <i v-if="iconClass(subitem.icon)" :class="iconClass(subitem.icon)"></i>
                            {{ translate(subitem.name) }}
                        </a>
                    </li>
                </ul>
            </li>
            <li v-else class="nav-item">
                <button v-if="item.api" type="button" class="nav-link btn btn-link" :class="item.class" :disabled="running" @click="runAction(item)">
                    <i v-if="iconClass(item.icon)" :class="iconClass(item.icon)"></i>
                    {{ translate(item.name) }}
                </button>
                <a v-else class="nav-link scrollto" :class="[item.class, { active: isActive(item) }]" :aria-current="isActive(item) ? 'page' : null" :target="item.target || ''" :rel="item.target === '_blank' ? 'noopener noreferrer' : null" :href="safeUrl(item.href)">
                    <i v-if="iconClass(item.icon)" :class="iconClass(item.icon)"></i>
                    {{ translate(item.name) }}
                </a>
            </li>
        </template>
    </ul>
    <!-- result of an API action menu item -->
    <div v-if="result" class="vu-admin-nav-result position-fixed bottom-0 end-0 m-3 shadow" style="z-index: 1080; max-width: 640px; width: calc(100% - 2rem);">
        <div class="alert mb-0" :class="result.running ? 'alert-secondary' : (result.ok ? 'alert-success' : 'alert-danger')" role="status">
            <div class="d-flex align-items-start gap-2">
                <strong class="me-auto">
                    {{ translate(result.name) }}
                    <span v-if="result.running" class="spinner-border spinner-border-sm ms-2" aria-hidden="true"></span>
                    <span v-else class="ms-2">— {{ result.ok ? translate('Done') : translate('Error') }} ({{ result.status }})</span>
                </strong>
                <button type="button" class="btn-close" :aria-label="translate('Close')" :disabled="result.running" @click="result = null"></button>
            </div>
            <pre v-if="!result.running" class="mt-2 mb-0 small overflow-auto" style="max-height: 50vh; white-space: pre-wrap;">{{ result.output }}</pre>
        </div>
    </div>
</template>

<script>
import { prepareFetchOptions, safeUrl, translate } from "./helpers";
import { getLanguage, LANGUAGE_CHANGE_EVENT } from "../i18n.js";

const VuAdminNav = {
    name: "VuAdminNav",
    props: {
        modelValue: Object,
        menu: {
            type: String,
            default: "admin",
        },
        url: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            auth: {},
            payload: null,
            loaded: false,
            language: getLanguage(),
            running: false,
            result: null,
            hash: typeof window !== "undefined" ? window.location.hash : "",
        };
    },
    computed: {
        navUrl() {
            if (this.url) {
                return this.url;
            }
            if (typeof window !== "undefined" && window.__VU_ADMIN_NAV_URL__) {
                return window.__VU_ADMIN_NAV_URL__;
            }
            const prefix = (typeof window !== "undefined" && window.__VU_ADMIN_PREFIX__) || "/admin";
            return prefix + "/api/navs";
        },
        menuClass() {
            return this.payload && this.payload.class ? this.payload.class : "";
        },
        visibleItems() {
            const items = this.payload && Array.isArray(this.payload.items) ? this.payload.items : [];
            return items.filter((item) => !item.disabled);
        },
    },
    mounted() {
        this._onLanguageChange = (event) => {
            this.language = event.detail.language;
        };
        window.addEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        // hash navigation (#product, #user): track the active menu item without a page reload
        this._onHashChange = () => {
            this.hash = window.location.hash;
        };
        window.addEventListener("hashchange", this._onHashChange);
    },
    beforeUnmount() {
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        window.removeEventListener("hashchange", this._onHashChange);
    },
    watch: {
        modelValue: {
            handler(value) {
                this.auth = value || {};
                if (this.auth.success) {
                    this.load();
                } else {
                    this.payload = null;
                    this.loaded = false;
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        safeUrl,
        // item names are translation keys: window.VuSettings.translate → built-in dictionary
        translate(key) {
            return translate(key, null, null, this.language);
        },
        // the icon can only be a CSS class (e.g. "bi bi-people me-1"), no HTML gets into the DOM;
        // the class is extracted from the legacy '<i class="...">' form
        iconClass(icon) {
            if (!icon || typeof icon !== "string") {
                return "";
            }
            if (icon.indexOf("<") === -1) {
                return icon;
            }
            const match = icon.match(/class\s*=\s*["']([^"']*)["']/i);
            return match ? match[1] : "";
        },
        // URL of an "API action" menu item: `api` is relative to the admin prefix ("/api/tools/cache"), same origin only
        actionUrl(item) {
            const api = String(item.api || "");
            if (api.charAt(0) !== "/" || api.charAt(1) === "/") {
                return null;
            }
            const prefix = (typeof window !== "undefined" && window.__VU_ADMIN_PREFIX__) || "/admin";
            return api.indexOf(prefix + "/") === 0 ? api : prefix + api;
        },
        // menu item {"api": "/api/tools/cache", "method": "POST", "body": {...}, "confirm": "..."} – fetch with the login token
        async runAction(item) {
            const url = this.actionUrl(item);
            if (!url || this.running) {
                return;
            }
            if (item.confirm && !window.confirm(this.translate(item.confirm))) {
                return;
            }

            const method = String(item.method || "POST").toUpperCase();
            const api = { options: { headers: {} } };
            const options = prepareFetchOptions(method, api, {}, this.auth);
            if (method !== "GET" && item.body !== undefined) {
                options.body = JSON.stringify(item.body);
            }

            this.running = true;
            this.result = { name: item.name, running: true, ok: false, status: "", output: "" };

            try {
                const response = await fetch(url, options);
                const text = await response.text();
                let output = text;
                try {
                    output = JSON.stringify(JSON.parse(text), null, 2);
                } catch (e) {
                    // not a JSON response: shown as text
                }
                this.result = { name: item.name, running: false, ok: response.ok, status: response.status, output };
            } catch (e) {
                this.result = { name: item.name, running: false, ok: false, status: "-", output: String(e && e.message ? e.message : e) };
            } finally {
                this.running = false;
            }
        },
        // active: the item's hash href ("#user") equals the current hash; "#" is active only for an empty hash
        isActive(item) {
            const href = item && typeof item.href === "string" ? item.href : "";
            if (href.charAt(0) !== "#") {
                return false;
            }
            const current = this.hash || "#";
            return href === current;
        },
        hasActiveChild(item) {
            return Array.isArray(item.items) && item.items.some((child) => !child.disabled && this.isActive(child));
        },
        visibleChildren(item) {
            const children = Array.isArray(item.items) ? item.items.filter((child) => !child.disabled) : [];

            // grouped menu (header / divider): config order is kept, otherwise sorted by name
            if (children.some((child) => child.header || child.divider)) {
                return children;
            }

            return children.slice().sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
        },
        async load() {
            if (this.loaded || !this.auth || !this.auth.success) {
                return;
            }

            const api = { options: { headers: {} } };
            const options = prepareFetchOptions("GET", api, {}, this.auth);

            try {
                const response = await fetch(this.navUrl, options);
                if (!response.ok) {
                    return;
                }
                const data = await response.json();
                this.payload = data[this.menu] || { items: [] };
                this.loaded = true;
            } catch (e) {
                this.payload = { items: [] };
            }
        },
    },
};

export default VuAdminNav;
export { VuAdminNav };
</script>
