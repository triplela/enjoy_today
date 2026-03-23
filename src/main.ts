import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
// Import Inter font weights: 300, 400, 500, 600, 700
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './assets/styles/main.css';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
