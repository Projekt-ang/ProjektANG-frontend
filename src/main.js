/*jshint node: true, esversion: 6 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import VueLodash from 'vue-lodash';
import VueModal from 'vue-js-modal'

const req = axios.create({
  baseURL: "http://http://77.55.210.216:3000/",
  withCredentials: true,
});
Vue.prototype.$req = req;

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueLodash);
Vue.use(VueModal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
