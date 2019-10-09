/*jshint node: true, esversion: 6 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import VueLodash from 'vue-lodash';

const req = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});
Vue.prototype.$req = req;

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueLodash);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
