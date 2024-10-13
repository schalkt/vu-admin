<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vu-admin :entity="'product'" :eventBus="eventBus"></vu-admin>
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'post'" :eventBus="eventBus"></vu-admin>
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'user'" :eventBus="eventBus"></vu-admin>
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
  data() {
    return {
      eventBus: VuAdmin.eventBus,
    };
  }
};
</script>