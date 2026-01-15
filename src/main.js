import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import stores from './stores'
import { Vue3Marquee } from 'vue3-marquee'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App)
app.use(Vue3Marquee)

app.use(VCalendar, {});
app.use(router)
app.use(stores)

app.mount('#app')
