<template>
  <div v-cloak v-if="entity && settings.table">
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
  data() {
    return {
      settings: {},
    };
  },
  mounted() {
    if (window.VuEntities && window.VuEntities[this.entity]) {
      this.settings = window.VuEntities[this.entity];
      this.settings.entity = this.entity;

      if (this.settings.init) {
        this.settings.init(this.settings);
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

    createItem() {
      this.errors = null;
      this.item = {};
      this.modalWindow.show();

      setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },

    copyItem() {
      this.errors = null;
      this.item[this.settings.pkey] = undefined;
      this.modalWindow.show();

      setTimeout(() => {
        this.itemOriginal = Object.assign({}, this.item);
      }, 100);
    },
  },
  components: {
    VuAdminTable,
  },
};
</script>

<style lang="scss" scoped>
</style>
