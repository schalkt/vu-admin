<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vu-admin :entity="'products'" />
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'users'" />
      </div>
    </div>
  </div>
</template>
  
<script>
import VuAdmin from "./src/components/VuAdmin.vue";

export default {
  components: {
    VuAdmin,
  },
};
</script>
  