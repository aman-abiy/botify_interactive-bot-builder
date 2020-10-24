import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import titleMixin from './mixins/titleMixin.js'
import VueGraph from 'vue-graph'
import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import Clipboard from 'v-clipboard'
import VOffline from 'v-offline';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + localStorage.getItem('token') || null,
}

try {
    axios.interceptors.response.use((response) => {
        return response;
    }, function(error) {
        // Do something with response error
        if (error.response.status === 401) {
            router.push({ name: 'Login' })
        }

        if (error.response.status === 404) {
            router.push({ name: '404' })
        }
    });
} catch (error) {

}

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(VueGraph)
Vue.use(Clipboard)
Vue.use(VueToast, { dismissible: true });
Vue.component('VOffline', require('v-offline'));

Vue.mixin(titleMixin)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')