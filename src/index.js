import VuAdmin from './components/VuAdmin.vue';

export { VuAdmin };

export default {
  install(app) {
    app.component('VuAdmin', VuAdmin);        
  }
};
