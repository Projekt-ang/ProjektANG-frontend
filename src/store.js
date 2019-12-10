/*jshint node: true, esversion: 6 */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authStatus: "",
    token: localStorage.getItem("prAngToken") || "",
    user: JSON.parse(localStorage.getItem("prAngUser") || "{}")
  },
  mutations: {
    auth_request(state) {
      state.authStatus = "loading";
    },
    auth_success(state, { token, user }) {
      state.authStatus = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.authStatus = "error";
    },
    logout(state) {
      state.authStatus = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8088/api/authenticate",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.jwttoken;
            const decoded = jwt.decode(token, { json: true });
            const roles = decoded.roles.split(",");
            let user = {};
            user.username = decoded.sub;
            user.roles = roles;
            localStorage.setItem("prAngUser", JSON.stringify(user));
            localStorage.setItem("prAngToken", token);
            axios.defaults.headers.common.Authorization = "Bearer " + token;
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.authStatus,
    user: state => state.user
  }
});
