import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import "noty/src/noty.scss";
import "noty/src/themes/mint.scss";

createApp(App).use(router).mount('#app')
