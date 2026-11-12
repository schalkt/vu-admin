<template>
  <!-- complete admin page: header (brand, nav, user buttons), entity views, auth modal – configured by window.VuSettings.app -->
  <vu-admin-app></vu-admin-app>
</template>

<script>
import { VuAdminApp } from "./src/components/VuAdminApp.vue";

export default {
  components: {
    VuAdminApp,
  }
};
</script>

<style></style>
