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
            _help: 'A Freemail és Citromail szolgáltatók nem minden esetben fogadják be megfelelően az e-maileket, így a kézbesítés nem garantált.'
          },
          password: {
            label: 'Jelszó',
            icon: 'bi bi-key-fill',
            placeholder: 'Add meg a jelszavad',
            type: 'password',
            help: 'Legyen benne legalább 1 kisbetű, 1 nagybetű és 1 szám. Minimum 4 karakter.',
            _pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
            pattern: '^(?=.*[a-z]).+$',
            minlength: 4,
            hash: 0
          },
          password_again: {
            label: 'Jelszó ismét',
            icon: 'bi bi-key-fill',
            type: 'password',
            placeholder: 'Ismételd meg a jelszavad',
            _help: 'Ide gépeld be újra a jelszavadat amit megadtál.'
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
          onsuccess: (responseData, auth) => {
            auth.user = responseData;
            // auth.token = responseData.accessToken;
            auth.header = ['X-Auth-Token', responseData.accessToken]
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
          class: 'btn btn-outline-primary',
          icon: 'bi bi-box-arrow-in-right me-2',
          panel: 'login',
          dropdowns: [
            {
              class: 'dropdown-item fw-light',
              label: (params, settings, self) => {
                return self.auth.user.email;
              },
            }, {
              class: 'dropdown-divider'
            }, {
              class: 'dropdown-item cursor-pointer',
              label: (params, settings, self) => {
                return `<i class='bi bi-box-arrow-right me-1'></i> Kilépés`
              },
              action: (params, self) => {
                self.logout();
              }
            }],
          label: (params, settings, self) => {

            if (!self.auth || !self.auth.user) {
              return 'Bejelentkezés';
            }

            let fullName = [self.auth.user.firstName, self.auth.user.lastName].join(' ');
            let img = `<img class='img-fluid rounded me-2' width='22' src='${self.auth.user.image}' />`;

            return img + fullName;

          }
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

<style></style>