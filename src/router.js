/*jshint node: true, esversion: 6 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import TextTest from './views/TextTest.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/about/:id',
      name: 'test',
      component: TextTest,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
});
