import { createApp } from 'vue'

import axios from 'axios'

import App from './App.vue'
import router from './router'
// import './assets/base.css';

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.css';

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App);

axios.defaults.baseURL = 'http://127.0.0.1:8000';

app.use(router);
app.use(vuetify);
app.mount('#app');

const link = document.createElement('link'); 
link.href = 'https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&display=swap'; 
link.rel = 'stylesheet'; 
document.head.appendChild(link);