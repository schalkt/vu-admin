<template>
    <ul v-cloak v-if="auth && auth.success && visibleItems.length" class="navbar-nav me-auto mb-2 mb-lg-0" :class="menuClass">
        <template v-for="(item, index) in visibleItems" :key="index">
            <li v-if="item.items && item.items.length" class="nav-item dropdown">
                <button class="btn dropdown-toggle" :class="item.class" type="button" data-bs-toggle="dropdown">
                    <i v-if="iconClass(item.icon)" :class="iconClass(item.icon)"></i>
                    <span>{{ translate(item.name) }}</span>
                </button>
                <ul class="dropdown-menu">
                    <li v-for="(subitem, subindex) in visibleChildren(item)" :key="subindex">
                        <a class="dropdown-item" :class="subitem.class" :target="subitem.target || ''" :rel="subitem.target === '_blank' ? 'noopener noreferrer' : null" :href="safeUrl(subitem.href)">
                            <i v-if="iconClass(subitem.icon)" :class="iconClass(subitem.icon)"></i>
                            {{ translate(subitem.name) }}
                        </a>
                    </li>
                </ul>
            </li>
            <li v-else class="nav-item">
                <a class="nav-link scrollto" :class="item.class" :target="item.target || ''" :rel="item.target === '_blank' ? 'noopener noreferrer' : null" :href="safeUrl(item.href)">
                    <i v-if="iconClass(item.icon)" :class="iconClass(item.icon)"></i>
                    {{ translate(item.name) }}
                </a>
            </li>
        </template>
    </ul>
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
    },
    beforeUnmount() {
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
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
        visibleChildren(item) {
            const children = Array.isArray(item.items) ? item.items.filter((child) => !child.disabled) : [];
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
