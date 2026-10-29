<template>
    <ul v-cloak v-if="auth && auth.success && visibleItems.length" class="navbar-nav me-auto mb-2 mb-lg-0" :class="menuClass">
        <template v-for="(item, index) in visibleItems" :key="index">
            <li v-if="item.items && item.items.length" class="nav-item dropdown">
                <button class="btn dropdown-toggle" :class="item.class" type="button" data-bs-toggle="dropdown">
                    <span v-html="item.icon"></span>
                    <span>{{ item.name }}</span>
                </button>
                <ul class="dropdown-menu">
                    <li v-for="(subitem, subindex) in visibleChildren(item)" :key="subindex">
                        <a class="dropdown-item" :class="subitem.class" :target="subitem.target || ''" :href="subitem.href">
                            <span v-html="subitem.icon"></span>
                            {{ subitem.name }}
                        </a>
                    </li>
                </ul>
            </li>
            <li v-else class="nav-item">
                <a class="nav-link scrollto" :class="item.class" :target="item.target || ''" :href="item.href">
                    <span v-html="item.icon"></span>
                    {{ item.name }}
                </a>
            </li>
        </template>
    </ul>
</template>

<script>
import { prepareFetchOptions } from "./helpers";

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
            const prefix = (typeof window !== "undefined" && window.__VU_ADMIN_PREFIX__) || "/szerk";
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
