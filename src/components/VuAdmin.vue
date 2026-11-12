<template>
  <!-- multi-entity mode: <vu-admin :auth="auth"> without entity → every entity of auth.settings.entities,
       switched by the URL hash (#user, #product); a table is created (and calls its API) only when it first
       becomes visible, afterwards v-show just hides it, so its state is kept -->
  <div v-if="!entity" v-cloak class="vu-admin-views">
    <template v-if="auth && auth.success && auth.user">
      <div v-for="view in views" :key="view.entity" v-show="isVisible(view.entity)" class="vu-admin-view" :data-entity="view.entity">
        <vu-admin v-if="loaded[view.entity]" :entity="view.entity" :preset="view.preset" :auth="auth"></vu-admin>
      </div>
    </template>
  </div>
  <div v-cloak v-else-if="settings">
    <div v-if="auth" class="vu-admin" :data-bs-theme="[settings.theme]">
      <vu-admin-table :settings="settings" :auth="auth"></vu-admin-table>
    </div>
  </div>
</template>

<script>

import VuAdminTable from "./VuAdminTable.vue";
import { getLanguage, LANGUAGE_CHANGE_EVENT } from "../i18n.js";

import {
  translate,
  deepMerge,
  getValueOrFunction,
  getResponseJson,
  getResponseErrors,
  prepareFetchUrl,
  prepareFetchOptions
} from "./helpers";

const VuAdmin = {
  name: "VuAdmin",
  props: {
    // empty → multi-entity mode (see template)
    entity: {
      type: String,
      required: false,
    },
    preset: {
      type: String,
      required: false,
    },
    auth: {
      type: Object,
    }
  },
  init: (params) => {
    if (!params) {
      return;
    }
  },
  watch: {
    auth: {
      immediate: true,
      handler(newValue, oldValue) {

        if (this.entity && newValue != oldValue) {
          this.loadSettings();
        }

      }
    },
    // multi-entity mode: mark the currently visible entities as loaded (they exist from then on)
    activeEntity: {
      immediate: true,
      handler() {
        this.markVisibleLoaded();
      },
    },
    views() {
      this.markVisibleLoaded();
    },
  },
  computed: {
    // auth.settings.entities: { user: '/vu-entity-user.js' } or { product: { url: '/vu-entity-product.js', preset: 'dash' } }
    views() {
      const entities = this.auth && this.auth.settings && this.auth.settings.entities ? this.auth.settings.entities : {};
      return Object.keys(entities)
        .filter((name) => entities[name] && !entities[name].disabled)
        .map((name) => ({
          entity: name,
          preset: typeof entities[name] === "object" ? entities[name].preset : undefined,
        }));
    },
    // unknown / empty hash (e.g. "#" = Dashboard) → every entity is visible
    activeEntity() {
      return this.views.some((view) => view.entity === this.route) ? this.route : null;
    },
  },

  data() {
    return {
      settings: undefined,
      route: this.currentRoute(),
      loaded: {},
      defaults: {
        // primary id field name
        // required, default : undefined
        pkey: "id",

        // Boostrap theme
        // optional, default : 'light'
        theme: undefined,

        // VU Admin container class
        // optional, default : null
        class: "my-1 p-3 rounded",

        // must be function and called once for update entity settings
        // example prepare options for selects, (settings) => {},
        init: null,
        // UI language: user choice (localStorage) or browser language; an entity can pin its own
        language: getLanguage(),

        api: {
          auth: {},
          options: {},
          input: {
            // when item is null -> item = response.data
            // when item is a string -> item = response.data[input.item]
            // when item is a function -> item = input.item(data, response)
            item: undefined,

            // when items is null -> items = response.data
            // when items is a string -> items = response.data[input.items]
            // when items is a function -> items = input.items(data, response)
            items: undefined,

            // when total is a string -> total = response.data[input.total]
            // when total is a function -> total = input.total(data, response)
            total: undefined,
          },
          output: {
            item: undefined,
            flatten: true,
            fields: undefined
          }
        },

        // entity / project level overrides, merged over the built-in dictionary (src/i18n.js)
        translate: {},
        events: {
          // init
          afterSettingsInit: undefined,

          // items
          beforeItemsLoad: undefined,
          afterItemsLoad: undefined,

          // item
          afterItemLoad: undefined,
          beforeItemSave: undefined,
          afterItemSave: undefined,
          beforeItemDelete: undefined,
          afterItemDelete: undefined,

          // bulk
          beforeBulkSave: undefined,
          afterBulkSave: undefined,

          // export
          beforeItemsExport: undefined,
        },

        // define relations
        relations: {},

        // define table
        table: {
          title: null,
          columns: [],
          pagination: {
            size: 10,
            limit: 10,
            limits: [10, 20, 50, 100]
          },
          order: {},
          control: {},
          details: {},
          exports: {},
        },

        form: {

        }

      },
    }
  },
  created() {
    // the user menu language switch updates every table / form on the page
    this._onLanguageChange = (event) => {
      if (this.settings && !this.languagePinned) {
        this.settings.language = event.detail.language;
      }
    };
    window.addEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);

    // multi-entity mode: hash navigation (VuAdminNav "#user" hrefs), without a page reload
    if (!this.entity) {
      this._onHashChange = () => {
        this.route = this.currentRoute();
        window.scrollTo({ top: 0 });
      };
      window.addEventListener("hashchange", this._onHashChange);
    }
  },
  beforeUnmount() {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
    if (this._onHashChange) {
      window.removeEventListener("hashchange", this._onHashChange);
    }
  },
  mounted() { },
  methods: {

    currentRoute() {
      return typeof window !== "undefined" ? decodeURIComponent(window.location.hash.replace(/^#\/?/, "")) : "";
    },

    isVisible(entity) {
      return !this.activeEntity || this.activeEntity === entity;
    },

    markVisibleLoaded() {
      if (this.entity) {
        return;
      }
      this.views.forEach((view) => {
        if (this.isVisible(view.entity)) {
          this.loaded[view.entity] = true;
        }
      });
    },

    // the entity config script URL: a string or { url, preset }
    entityUrl() {
      const config = this.auth.settings.entities[this.entity];
      return typeof config === "object" ? config.url : config;
    },

    async loadSettings() {

      if (!this.auth || !this.auth.success || !this.auth.user) {
        console.error(`Authentication required`);
        return;
      }

      if (!this.auth.settings || !this.auth.settings.entities || !this.auth.settings.entities[this.entity] || !this.entityUrl()) {
        console.error(`Entity config (${this.entity}) not found`);
        return;
      }

      const entitiesVariable = this.auth.settings.entitiesVariable ? this.auth.settings.entitiesVariable : 'VuEntities';

      // const module = await import(/* @vite-ignore */ this.auth.settings.entities[this.entity]);
      this.loadScript(this.entityUrl(), () => {

        if (window[entitiesVariable] && window[entitiesVariable][this.entity]) {
          this.init(window[entitiesVariable][this.entity](this.preset));
        } else {
          console.error(`Entity config (${this.entity}) not found`);
        }

      }, entitiesVariable);


    },

    loadScript(path, callback, entitiesVariable) {

      if (window[entitiesVariable] && window[entitiesVariable][this.entity]) {

        if (callback) {
          callback();
        }

        return;

      }

      const script = document.createElement("script");
      script.async = true;
      script.src = path;
      script.onload = () => {

        if (callback) {
          callback();
        }

      };
      script.onerror = () => {
        console.error(`[vu-admin] failed to load entity script: ${path}`);
      };

      document.head.appendChild(script);

    },

    init(entitySettings) {

      if (entitySettings) {

        this.languagePinned = !!entitySettings.language;
        this.settings = deepMerge(this.defaults, entitySettings);
        this.settings.entity = this.entity;
        this.settings.preset = this.preset ? this.preset : "default";

        if (!this.settings.theme) {
          const theme = document.documentElement.getAttribute("data-bs-theme");
          this.settings.theme = theme ? theme : "light";
        }

        // if (!this.settings.translate) {
        //   this.settings.translate = {};
        // }

        // for (let language in this.translate) {
        //   this.settings.translate[language] = Object.assign(
        //     {},
        //     this.translate[language] ? this.translate[language] : {},
        //     this.settings.translate[language]
        //       ? this.settings.translate[language]
        //       : {}
        //   );
        // }

        if (this.settings.events.afterSettingsInit) {
          this.settings.events.afterSettingsInit(this.settings);
        }

        if (this.settings.debug) {
          console.log(`[vu-admin] entity "${this.entity}" initialized`, this.settings.debug > 1 ? this.settings : '');
        }

      } else {
        console.error(`Entity config (${this.entity}) not found`);
      }

      this.$forceUpdate();

    }


  },
  components: {
    VuAdminTable,
  },
};

export default VuAdmin;
export { VuAdmin };

</script>

<style lang="scss">
.vu-admin {
  [v-cloak] {
    display: none !important;
  }

  .ff-mono {
    font-family: monospace;
  }

  input[type="number"] {
    text-align: end;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  a.link {
    position: relative;
    display: inline-block;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  a.link:before {
    content: "\F135";
    padding-left: 3px;
    padding-right: 6px;
    display: inline-block;
    font-family: "bootstrap-icons" !important;
    font-weight: 100;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    transition: all 0.25s;
    vertical-align: text-top;
    color: #4b89e7;
  }

  a.link:hover:before {
    padding-left: 6px;
    padding-right: 3px;
  }

  .p-badge {
    padding: 0.15em 0.30em;
  }

}
</style>
