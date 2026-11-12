<template>
    <component :is="href ? 'a' : 'div'" :href="href || null" class="vu-admin-count card text-decoration-none" :class="cardClass"
        :title="href ? translate('Open') : null">
        <div class="card-body d-flex align-items-center gap-3">
            <i v-if="icon" class="vu-admin-count-icon fs-2" :class="[icon, colorClass]" :style="colorStyle"></i>
            <div class="flex-grow-1 min-w-0">
                <div class="vu-admin-count-value fs-3 fw-semibold lh-1">
                    <span v-if="count === null && !error" class="spinner-border spinner-border-sm text-secondary" aria-hidden="true"></span>
                    <span v-else-if="error" class="text-danger" :title="error">–</span>
                    <span v-else :class="colorClass" :style="colorStyle">{{ formatted }}</span>
                </div>
                <div class="vu-admin-count-title text-secondary small text-truncate mt-1">{{ translate(title || entity) }}</div>
            </div>
        </div>
    </component>
</template>

<script>
import {
    loadEntityConfig,
    prepareFetchUrl,
    prepareFetchOptions,
    getResponseJson,
    getResponseErrors,
    translate,
} from "./helpers";
import { getLanguage, LANGUAGE_CHANGE_EVENT } from "../i18n.js";

// dashboard counter: number of records of an entity (optionally filtered), e.g. "13 open todos"
const VuAdminCount = {
    name: "VuAdminCount",
    props: {
        entity: { type: String, required: true },
        auth: Object,
        preset: String,
        // { completed: false } → filter[completed] = { value: false, operator: '=' }
        // or { price: { value: 100, operator: '>' } }
        filter: Object,
        title: String,
        icon: String,
        // color of the number and the icon: a Bootstrap color name ('primary', 'success', 'warning', 'danger',
        // 'info', 'secondary', …) or a hex color ('#e15759')
        color: String,
        href: String,
        cardClass: { type: [String, Array, Object], default: "border-0 shadow-sm" },
        // false while hidden (e.g. another view is shown): refreshes when it becomes visible again
        visible: { type: Boolean, default: true },
    },
    data() {
        return {
            count: null,
            error: null,
            language: getLanguage(),
        };
    },
    computed: {
        colorClass() {
            return this.color && /^[a-z][a-z0-9-]*$/.test(this.color) ? "text-" + this.color : null;
        },
        colorStyle() {
            return this.color && /^#[0-9a-fA-F]{3,8}$/.test(this.color) ? { color: this.color } : null;
        },
        formatted() {
            try {
                return Number(this.count).toLocaleString(this.language);
            } catch (e) {
                return String(this.count);
            }
        },
    },
    watch: {
        visible(value) {
            if (value) {
                this.load();
            }
        },
        auth() {
            this.load();
        },
    },
    mounted() {
        this._onChange = (event) => {
            if (event.detail && event.detail.entity === this.entity) {
                this.load();
            }
        };
        this._onLanguageChange = (event) => {
            this.language = event.detail.language;
        };
        window.addEventListener("vu-admin:change", this._onChange);
        window.addEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        this.load();
    },
    beforeUnmount() {
        window.removeEventListener("vu-admin:change", this._onChange);
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
    },
    methods: {
        translate(key) {
            return translate(key, null, null, this.language);
        },
        apiFilter() {
            const filter = {};
            Object.keys(this.filter || {}).forEach((field) => {
                const rule = this.filter[field];
                filter[field] = rule !== null && typeof rule === "object" && !Array.isArray(rule)
                    ? Object.assign({ operator: "=" }, rule)
                    : { value: rule, operator: "=" };
            });
            return Object.keys(filter).length ? filter : null;
        },
        async load() {
            if (!this.auth || !this.auth.success) {
                return;
            }

            try {
                const settings = await loadEntityConfig(this.auth, this.entity, this.preset || "count");
                if (!settings) {
                    this.error = "Entity config not found";
                    return;
                }

                const base = Object.assign({}, settings.api || {}, (settings.table && settings.table.api) || {});
                const input = base.input || {};
                const options = base.options || {};
                const api = {
                    url: base.url,
                    options: Object.assign({}, options, { headers: Object.assign({}, options.headers) }),
                };

                const params = { limit: 1 };
                const filter = this.apiFilter();
                if (filter) {
                    params.filter = filter;
                }

                const response = await fetch(prepareFetchUrl("GET", api, null, params), prepareFetchOptions("GET", api, null, this.auth));
                const json = await getResponseJson(response);
                const errors = getResponseErrors(response, json);

                if (errors || !json.data) {
                    this.error = "Error";
                    return;
                }

                let total;
                if (typeof input.total === "function") {
                    total = input.total(json.data, response);
                } else if (typeof input.total === "string") {
                    total = json.data[input.total];
                } else {
                    total = json.data.total;
                }

                this.count = Number(total) || 0;
                this.error = null;
            } catch (e) {
                console.error(`[vu-admin] count (${this.entity})`, e);
                this.error = String(e && e.message ? e.message : e);
            }
        },
    },
};

export default VuAdminCount;
export { VuAdminCount };
</script>

<style lang="scss">
.vu-admin-count {
    color: inherit;
    transition: box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out;

    &[href]:hover {
        transform: translateY(-1px);
        box-shadow: var(--bs-box-shadow) !important;
    }

    .vu-admin-count-icon {
        opacity: 0.6;

        &[class*="text-"],
        &[style*="color"] {
            opacity: 0.85;
        }
    }
}
</style>
