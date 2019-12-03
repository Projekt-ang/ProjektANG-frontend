/*jshint node: true, esversion: 6 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt from 'jsonwebtoken';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authStatus: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.authStatus = 'loading';
        },
        auth_success(state, token, user) {
            state.authStatus = 'success';
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.authStatus = 'error';
        },
        logout(state) {
            state.authStatus = '';
            state.token = '';
        }
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({ url: 'http://18.195.242.27:8088/api/authenticate', data: user, method: 'POST' })
                    .then(resp => {
                        console.log("TESTTES");
                        const token = resp.data.jwttoken;
                        const decoded = jwt.decode(token, { json: true });
                        const roles = decoded.roles.split(",");
                        let userData = {};
                        userData.username = decoded.sub;
                        userData.roles = roles;
                        console.log(user);
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common.Authorization = "Bearer " + token;
                        commit('auth_success', token, userData);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common.Authorization;
                resolve();
            });
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.authStatus
    }
  });
