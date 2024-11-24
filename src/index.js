import VuAdmin from './components/VuAdmin.vue';
import VuAuth from './components/VuAuth.vue';
import VuUserButton from './components/VuUserButton.vue';

export { VuAdmin, VuAuth, VuUserButton };

export default {
  install(app) {
    app.component('VuAdmin', VuAdmin);
    app.component('VuAuth', VuAuth);
    app.component('VuUserButton', VuUserButton);
  }
};
