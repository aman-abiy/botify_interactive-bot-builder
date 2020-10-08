import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueGraph from 'vue-graph'
import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import Clipboard from 'v-clipboard'

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + localStorage.getItem('token') || null,
}

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(VueGraph)
Vue.use(Clipboard)
Vue.use(VueToast, { dismissible: true });

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')