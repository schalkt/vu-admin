<template>
  <div v-cloak v-if="entity && settings">
    <div v-if="auth" class="vu-admin" :data-bs-theme="[settings.theme]">
      <vu-admin-table :settings="settings" :auth="auth"></vu-admin-table>
    </div>
  </div>
</template>

<script>

import VuAdminTable from "./VuAdminTable.vue";

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
    entity: {
      type: String,
      required: true,
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

        if (newValue != oldValue) {
          this.loadSettings();
        }

      }
    }
  },

  data() {
    return {
      settings: undefined,
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
        language: document.documentElement ? document.documentElement.lang : 'hu',

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

        translate: {
          hu: {
            Columns: "Oszlopok",
            All: "Mind",
            page: "oldal",
            row: "sor",
            hidden: "rejtett",
            First: "Első",
            Next: "Következő",
            Prev: "Előző",
            Last: "Utolsó",
            Reload: "Újratöltés",
            New: "Új",
            Active: "Aktív",
            Deleted: "Törölt",
            Copy: "Másolás",
            Delete: "Törlés",
            Close: "Bezár",
            Save: "Mentés",
            Send: "Küldés",
            Export: "Exportálás",
            "Select all": "Mind kiválaszt",
            "Unselect all": "Mind töröl",
            "Invert all": "Kijelölések megfordítása",
            "Visible all": "Mind látható",
            "Hidden all": "Mind rejtett",
            "Save and close": "Ment és bezár",
            "=": "Egyenlő",
            ">": "Nagyobb",
            ">=": "Nagyobb vagy egyenlő",
            "<": "Kisebb",
            "<=": "Kisebb vagy egyenlő",
            "Are you sure you want to delete all selected items?":
              "Biztos hogy törölni akarod az összes kiválasztott elemet?",
          },
        },
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



  },
  mounted() { },
  methods: {

    async loadSettings() {

      if (!this.auth || !this.auth.success || !this.auth.user) {
        console.error(`Authentication required`);
        return;
      }

      if (!this.auth.settings || !this.auth.settings.entities || !this.auth.settings.entities[this.entity]) {
        console.error(`Entity config (${this.entity}) not found`);
        return;
      }

      const entitiesVariable = this.auth.settings.entitiesVariable ? this.auth.settings.entitiesVariable : 'VuEntities';

      // const module = await import(/* @vite-ignore */ this.auth.settings.entities[this.entity]);
      this.loadScript(this.auth.settings.entities[this.entity], () => {

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
      script.onerror = () => { };

      document.head.appendChild(script);

    },

    init(entitySettings) {

      if (entitySettings) {

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

          console.log(`Entity config (${this.entity}) initialized`);

          if (this.settings.debug > 1) {
            console.log(this.settings);
          }

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
