<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vu-auth v-model="auth" :settings="{
          maxwidth: 400,
          api: {
            login: '/api/auth/login',
            register: '/api/auth/register',
            password: '/api/auth/password',
          },
          username: {
            value: 'emilys',
            type: 'text',
            label: 'Felhasználónév',
            icon: 'bi bi-envelope',
            placeholder: 'Add meg a felhasználóneved',
            help: 'A Freemail és Citromail szolgáltatók nem minden esetben fogadják be megfelelően az e-maileket, így a kézbesítés nem garantált.'
          },
          password: {
            icon: 'bi bi-key-fill',
            help: 'Kisbetű, nagybetű, szám, min. 8 karakter.'
          },
          _help: '<strong>Segítség</strong><br>Az alábbiakban...',
          accepts: [{
            text: 'Elfogadom az ÁSZF-et',
            link:
            {
              label: 'ÁSZF',
              url: '/aszf.pdf'
            },

          },
          {
            text: 'Elfogadom az ÁSZF-et',
            link:
            {
              label: 'Adatkezelési tájékoztató',
              url: '/adatkezelesi-tajekoztato.pdf'
            }

          }],
          onsuccess: (responseData) => {
            // console.log(userdata);
          }
        }"></vu-auth>
      </div>

      <header class="sticky-top text-end p-2">
        <vu-user-button v-model="auth" :settings="{
          class: 'btn btn-warning me-2',
          label: 'Regisztráció',
          icon: 'bi bi-person-plus me-2',
          panel: 'registration',
        }"></vu-user-button>
        <vu-user-button v-model="auth" :settings="{
          class: 'btn btn-primary',
          label: 'Bejelentkezés',
          icon: 'bi bi-box-arrow-in-right me-2',
          panel: 'login'
        }"></vu-user-button>
      </header>

      <div class="col-md-12">
        <vu-admin :entity="'product'" :auth="auth"></vu-admin>
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'post'" :auth="auth"></vu-admin>
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'user'" :auth="auth"></vu-admin>
      </div>
    </div>
  </div>
</template>

<script>
import { VuAdmin } from "./src/components/VuAdmin.vue";
import { VuAuth } from "./src/components/VuAuth.vue";
import { VuUserButton } from "./src/components/VuUserButton.vue";

export default {
  data() {
    return {
      auth: null
    }
  },
  components: {
    VuAdmin,
    VuAuth,
    VuUserButton
  }
};
</script>