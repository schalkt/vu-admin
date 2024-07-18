<template>
  <div class="container-fluid mt-5">
  <div class="row">
    <div class="col-md-6">
      <vu-admin :entity="'post'" />
    </div>
    <div class="col-md-6">
      <vu-admin :entity="'checks'" />
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
  