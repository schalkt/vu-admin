<template>
  <div
    v-cloak
    v-if="entity && settings.table"
    class="vu-admin"
    :data-bs-theme="[settings.theme]"
  >
    <vu-admin-table :settings="settings"></vu-admin-table>
  </div>
</template>


<script>
import VuAdminTable from "./VuAdminTable.vue";

String.prototype.slugify = function (separator = "-") {
  return this.toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_/g, "-") // Replace _ with -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/\-$/g, ""); // Remove trailing -
};

export default {
  name: "VuAdmin",
  props: {
    entity: {
      type: String,
      required: true,
    },
  },
  init: (params) => {
    if (!params) {
      return;
    }

    console.log(params);
  },
  data() {
    return {
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
      settings: {
        // primary id field name
        // required, default : undefined
        pkey: "id",

        // Boostrap theme
        // optional, default : 'light'
        theme: "light",

        // VU Admin container class
        // optional, default : null
        class: "my-1 p-3 rounded",

        // must be function and called once for update entity settings
        // example prepare options for selects, (settings) => {},
        init: null,

        translate: {},

        // define relations
        relations: {
          user: {
            entity: "user",
            local: "user_id",
            foreign: "id",
            type: "1-8",
          },
        },
      },
    };
  },
  mounted() {
    if (window.VuEntities && window.VuEntities[this.entity]) {
      Object.assign(this.settings, window.VuEntities[this.entity]);
      this.settings.entity = this.entity;

      if (this.settings.init) {
        this.settings.init(this.settings);
      }

      if (!this.settings.theme) {
        const theme = document.documentElement.getAttribute("data-bs-theme");
        this.settings.theme = theme ? theme : "light";
      }

      if (this.settings.translate) {
        for (let language in this.settings.translate) {
          this.settings.translate[language] = Object.assign(
            {},
            this.translate[language] ? this.translate[language] : {},
            this.settings.translate[language]
          );
        }
      }
    }
  },

  created() {},
  methods: {
    itemIsModified() {
      let original = JSON.stringify(this.itemOriginal);
      let current = JSON.stringify(this.item);

      // console.log(original, current);

      return original !== current;
    },
  },
  components: {
    VuAdminTable,
  },
};
</script>

<style lang="scss">
.vu-admin {
  [v-cloak] {
    display: none !important;
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
}
</style>
