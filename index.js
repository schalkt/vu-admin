import { createApp } from 'vue';
import App from './App.vue';
import VuAdmin from './src/components/VuAdmin.vue';

const app = createApp(App);
app.component('VuAdmin', VuAdmin);
app.mount('#app');
