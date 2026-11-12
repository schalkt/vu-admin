<template>
    <!-- the list fills the free header space, so an item with `itemClass: "ms-auto"` (and the ones after it) sit on the right -->
    <ul v-cloak v-if="auth && auth.success && visibleItems.length" class="navbar-nav flex-grow-1 mb-2 mb-lg-0" :class="menuClass">
        <template v-for="(item, index) in visibleItems" :key="index">
            <li v-if="item.items && item.items.length" class="nav-item dropdown" :class="item.itemClass">
                <button class="btn dropdown-toggle" :class="[item.class, { active: hasActiveChild(item) }]" type="button" data-bs-toggle="dropdown">
                    <i v-if="iconClass(item.icon)" :class="iconClass(item.icon)" :style="iconStyle(item)"></i>
                    <span>{{ translate(item.name) }}</span>
                </button>
                <ul class="dropdown-menu" :class="item.menuClass">
                    <li v-for="(subitem, subindex) in visibleChildren(item)" :key="subindex">
                        <!-- grouping: { "header": "Title" } = group header, { "divider": true } = divider -->
                        <hr v-if="subitem.divider" class="dropdown-divider">
                        <h6 v-else-if="subitem.header" class="dropdown-header" :class="subitem.class">
                            <i v-if="iconClass(subitem.icon)" :class="iconClass(subitem.icon)" :style="iconStyle(subitem)"></i>
                            {{ translate(subitem.header) }}
                        </h6>
                        <button v-else-if="subitem.api" type="button" class="dropdown-item" :class="subitem.class" :disabled="running" @click="runAction(subitem)">
                            <i v-if="iconClass(subitem.icon)" :class="iconClass(subitem.icon)" :style="iconStyle(subitem)"></i>
                            {{ translate(subitem.name) }}
                        </button>
                        <a v-else class="dropdown-item" :class="[subitem.class, { active: isActive(subitem) }]" :aria-current="isActive(subitem) ? 'page' : null" :target="subitem.target || ''" :rel="subitem.target === '_blank' ? 'noopener noreferrer' : null" :href="safeUrl(subitem.href)">
                            <i v-if="iconClass(subitem.icon)" :class="iconClass(subitem.icon)" :style="iconStyle(subitem)"></i>
                            {{ translate(subitem.name) }}
                        </a>
                    </li>
                </ul>
            </li>
            <li v-else class="nav-item" :class="item.itemClass">
                <button v-if="item.api" type="button" class="nav-link btn btn-link" :class="item.class" :disabled="running" @click="runAction(item)">
                    <i v-if="iconClass(item.icon)" :class="iconClass(item.icon)" :style="iconStyle(item)"></i>
                    {{ translate(item.name) }}
                </button>
                <a v-else class="nav-link scrollto" :class="[item.class, { active: isActive(item) }]" :aria-current="isActive(item) ? 'page' : null" :target="item.target || ''" :rel="item.target === '_blank' ? 'noopener noreferrer' : null" :href="safeUrl(item.href)">
                    <i v-if="iconClass(item.icon)" :class="iconClass(item.icon)" :style="iconStyle(item)"></i>
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
import { prepareFetchOptions, safeUrl, translate, entityColor, cssColor, entityAllowed } from "./helpers";
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
        // where the menu comes from:
        // 'api'      — the backend (GET url → [menu]), as before (default)
        // 'entities' — built from auth.settings.entities (title, icon, color, group, roles, nav: false), no request
        // 'merge'    — the entity items first, then the backend's; a backend item with the same "#entity" href
        //              replaces the entity item (and can disable it), a backend group with the same name is merged
        source: {
            type: String,
            default: "api",
        },
        // dropdown groups of the entity menu: { Content: { icon: 'bi bi-folder me-1', class: '', order: 10 } }
        groups: {
            type: Object,
            default: null,
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
        apiItems() {
            return this.payload && Array.isArray(this.payload.items) ? this.payload.items : [];
        },
        // auth.settings.entities → menu items: "#entity" links, grouped into dropdowns by `group`;
        // a "Dashboard" link first when auth.settings.dashboard is configured
        entityItems() {
            const settings = this.auth && this.auth.settings ? this.auth.settings : null;
            const entities = settings && settings.entities ? settings.entities : {};
            const role = this.auth && this.auth.user ? this.auth.user.role : null;
            const groupSettings = this.groups || {};
            const items = [];
            const groups = {};

            if (settings && settings.dashboard) {
                items.push({ name: "Dashboard", href: "#", icon: "bi bi-speedometer2 me-1" });
            }

            Object.keys(entities).forEach((name) => {
                const config = entities[name] && typeof entities[name] === "object" ? entities[name] : { url: entities[name] };
                if (!entities[name] || config.disabled || config.nav === false) {
                    return;
                }
                if (!entityAllowed(this.auth, name)) {
                    return;
                }
                const item = {
                    name: config.title || name.charAt(0).toUpperCase() + name.slice(1),
                    href: "#" + name,
                    icon: config.icon ? config.icon + (/\bme-\d\b/.test(config.icon) ? "" : " me-1") : "",
                };
                if (config.navOrder !== undefined) {
                    item.order = config.navOrder;
                }
                if (!config.group) {
                    items.push(item);
                    return;
                }
                if (!groups[config.group]) {
                    const group = Object.assign({ name: config.group, items: [], keepOrder: true }, groupSettings[config.group] || {});
                    group.items = [];
                    groups[config.group] = group;
                    items.push(group);
                }
                groups[config.group].items.push(item);
            });

            return items;
        },
        menuItems() {
            if (this.source === "entities") {
                return this.entityItems;
            }
            if (this.source === "merge") {
                return this.mergeItems(this.entityItems, this.apiItems);
            }
            return this.apiItems;
        },
        visibleItems() {
            return this.ordered(this.menuItems.filter((item) => !item.disabled && this.itemAllowed(item)))
                // a dropdown whose every item is hidden is left out too
                .filter((item) => !Array.isArray(item.items) || this.visibleChildren(item).some((child) => !child.header && !child.divider));
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
        // icon color: the item's own `color`, else the color of the entity its "#entity" href opens
        iconStyle(item) {
            let color = item && item.color;
            if (!color && item && typeof item.href === "string" && item.href.charAt(0) === "#") {
                color = entityColor(this.auth, item.href.slice(1).split("?")[0]);
            }
            const css = cssColor(color);
            return css ? { color: css } : null;
        },
        // active: the item's hash href ("#user") equals the current hash; "#" is active only for an empty hash
        isActive(item) {
            const href = item && typeof item.href === "string" ? item.href : "";
            if (href.charAt(0) !== "#") {
                return false;
            }
            // "#todos?userId=1" is still the "#todos" view
            const current = (this.hash || "#").split("?")[0] || "#";
            return href.split("?")[0] === current;
        },
        hasActiveChild(item) {
            return Array.isArray(item.items) && item.items.some((child) => !child.disabled && this.isActive(child));
        },
        // an item linked to an entity — its href is "#<entity>" or it has an `entity` key (e.g. an API action:
        // { name: 'Users', api: '/api/tools/migration/user', entity: 'user' }) — is shown only with access to it
        itemAllowed(item) {
            const settings = this.auth && this.auth.settings ? this.auth.settings : null;
            const entities = settings && settings.entities ? settings.entities : null;
            let entity = item && item.entity;
            if (!entity) {
                const key = this.hashKey(item);
                const name = key ? key.slice(1) : "";
                entity = name && entities && entities[name] ? name : null;
            }
            return !entity || entityAllowed(this.auth, entity);
        },

        // headers ({ header }) without items under them and extra dividers are dropped
        tidyGroup(children) {
            const result = [];
            children.forEach((child, index) => {
                if (child.header) {
                    // kept only when a normal item follows it
                    const next = children[index + 1];
                    if (next && !next.header && !next.divider) {
                        result.push(child);
                    }
                    return;
                }
                if (child.divider) {
                    const last = result[result.length - 1];
                    if (result.length && !last.divider) {
                        result.push(child);
                    }
                    return;
                }
                result.push(child);
            });
            while (result.length && result[result.length - 1].divider) {
                result.pop();
            }
            return result;
        },

        visibleChildren(item) {
            const children = this.tidyGroup(Array.isArray(item.items) ? item.items.filter((child) => !child.disabled && this.itemAllowed(child)) : []);

            // grouped menu (header / divider) and entity groups: config order is kept, otherwise sorted by name
            if (item.keepOrder || children.some((child) => child.header || child.divider)) {
                return this.ordered(children);
            }

            return this.ordered(children.slice().sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""))));
        },

        // items with a numeric `order` first (ascending), the others after them in their current order
        ordered(items) {
            if (!items.some((item) => typeof item.order === "number")) {
                return items;
            }
            return items
                .map((item, index) => ({ item, key: typeof item.order === "number" ? item.order : Number.MAX_SAFE_INTEGER, index }))
                .sort((a, b) => a.key - b.key || a.index - b.index)
                .map((entry) => entry.item);
        },

        // "#todos?userId=1" → "#todos"; null for other links
        hashKey(item) {
            const href = item && typeof item.href === "string" ? item.href : "";
            return href.charAt(0) === "#" ? href.split("?")[0] : null;
        },

        // source 'merge': entity items first, then the backend's. A backend item with the same "#entity" href
        // replaces the entity item in its place (so the backend can rename / disable it); a backend group with the
        // same name as an entity group is merged into it (its children likewise); everything else is appended.
        mergeItems(entityItems, apiItems) {
            const result = entityItems.map((item) => (Array.isArray(item.items) ? Object.assign({}, item, { items: item.items.slice() }) : item));

            // topLevel: the backend item is not inside a group. A bare "#" is also a placeholder href (e.g. disabled
            // or "coming soon" items): it only replaces the Dashboard link when it is an enabled top-level item
            const replace = (apiItem, topLevel) => {
                const key = this.hashKey(apiItem);
                if (!key || (key === "#" && (!topLevel || apiItem.disabled))) {
                    return false;
                }
                for (let i = 0; i < result.length; i++) {
                    if (this.hashKey(result[i]) === key) {
                        result[i] = apiItem;
                        return true;
                    }
                    const children = result[i].items;
                    if (Array.isArray(children)) {
                        const index = children.findIndex((child) => this.hashKey(child) === key);
                        if (index >= 0) {
                            children[index] = apiItem;
                            return true;
                        }
                    }
                }
                return false;
            };

            apiItems.forEach((apiItem) => {
                if (Array.isArray(apiItem.items)) {
                    const group = result.find((item) => Array.isArray(item.items) && item.name === apiItem.name);
                    if (group) {
                        // the backend group's settings (icon, class, disabled, …) win, the children are merged
                        Object.keys(apiItem).forEach((key) => {
                            if (key !== "items") {
                                group[key] = apiItem[key];
                            }
                        });
                        apiItem.items.forEach((child) => {
                            if (!replace(child, false)) {
                                group.items.push(child);
                            }
                        });
                        return;
                    }
                }
                if (!replace(apiItem, true)) {
                    result.push(apiItem);
                }
            });

            return result;
        },
        async load() {
            if (this.loaded || !this.auth || !this.auth.success) {
                return;
            }

            // the menu comes only from auth.settings.entities: no backend request
            if (this.source === "entities") {
                this.payload = { items: [] };
                this.loaded = true;
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
