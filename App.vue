<template>
  <div class="container-fluid">

    <header class="sticky-top text-end p-2 border shadow">
      <vu-user-button v-model="auth" :panel="'registration'"></vu-user-button>
      <vu-user-button v-model="auth" :panel="'login'"></vu-user-button>
    </header>

    <div class="row" v-if="auth && auth.user">
    
      <div class="col-md-12">
        <vu-admin :entity="'product'" :auth="auth" :preset="'dash'"></vu-admin>
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'post'" :auth="auth"></vu-admin>
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'user'" :auth="auth"></vu-admin>
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'todos'" :auth="auth"></vu-admin>
      </div>
    
    </div>

    <vu-auth v-model="auth" :settings="'auth'"></vu-auth>

    <pre class="my-5 bg-dark text-white p-3">{{ auth }}</pre>    

  </div>

</template>

<script>
import { VuAdmin } from "./src/components/VuAdmin.vue";
import { VuAuth } from "./src/components/VuAuth.vue";
import { VuUserButton } from "./src/components/VuUserButton.vue";

export default {
  data() {
    return {
      auth: {}
    }
  },
  mounted() {
    this.auth.inputs = {}
  },
  components: {
    VuAdmin,
    VuAuth,
    VuUserButton,    
  }
};
</script>

<style></style>