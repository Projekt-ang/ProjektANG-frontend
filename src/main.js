/*jshint node: true, esversion: 6 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import VueLodash from "vue-lodash";
import VueModal from "vue-js-modal";
import Vue2Editor from "vue2-editor";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const req = axios.create({
	baseURL: "http://18.195.242.27:8080/"
});
Vue.prototype.$req = req;

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueLodash);
Vue.use(VueModal);
Vue.use(Vue2Editor);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
