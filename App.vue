<template>
  <div class="container-fluid mt-5">
  <div class="row">
    <div class="col-md-4">
      <vu-admin :entity="'post'" />
    </div>
    <div class="col-md-8">
      <vu-admin :entity="'checks'" />
    </div>
    <div class="col-md-12">
      <vu-admin :entity="'lorem'" />
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
  