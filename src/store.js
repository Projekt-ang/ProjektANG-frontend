/*jshint node: true, esversion: 6 */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		authStatus: "",
		token:
			localStorage.getItem("prAngToken") || "",
		user: JSON.parse(
			localStorage.getItem("prAngUser") || "{}"
		),
		blankTests: [],
		tags: []
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
		},
		setBlankTests(state, blankTests) {
			state.blankTests = blankTests;
		},
		setTags(state, tags) {
			state.tags = tags;
		}
	},
	actions: {
		login({ commit }, user) {
			return new Promise((resolve, reject) => {
				commit("auth_request");
				axios({
					url:
						"http://18.195.242.27:8088/api/authenticate",
					data: user,
					method: "POST"
				})
					.then(resp => {
						const token = resp.data.jwttoken;
						const decoded = jwt.decode(token, {
							json: true
						});
						const roles = decoded.roles.split(
							","
						);
						let user = {};
						user.username = decoded.sub;
						user.roles = roles;
						user.id = decoded.id;
						localStorage.setItem(
							"prAngUser",
							JSON.stringify(user)
						);
						localStorage.setItem(
							"prAngToken",
							token
						);
						axios.defaults.headers.common.Authorization =
							"Bearer " + token;
						commit("auth_success", {
							token,
							user
						});
						resolve(resp);
					})
					.catch(err => {
						commit("auth_error");
						localStorage.removeItem("prAngToken");
						localStorage.removeItem("prAngUser");
						reject(err);
					});
			});
		},
		logout({ commit }) {
			return new Promise(resolve => {
				commit("logout");
				localStorage.removeItem("prAngToken");
				localStorage.removeItem("prAngUser");
				delete axios.defaults.headers.common
					.Authorization;
				resolve();
			});
		},
		loadBlankTests({ commit }) {
			axios
				.get(
					"http://18.195.242.27:8080/api/BlankInsertTests"
				)
				.then(response => {
					commit(
						"setBlankTests",
						response.data.body
					);
				})
				.catch(errors => {
					console.log(errors);
				});
		},
		loadTags({ commit }) {
			axios
				.get("http://18.195.242.27:8080/tags")
				.then(response => {
					commit(
						"setTags",
						response.data._embedded.tags
					);
				});
		}
	},
	getters: {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.authStatus,
		tags: state => state.tags,
		getBlankById: state => id =>
			state.blankTests.find(
				blank => blank.id === id
			),
		//{
		/* let tmp =  state.blankTests.find(blank => blank.id === id)

          //zamiana {0} {1} itd na poprawne odpowiedzi w tekscie
           let regex = /\{.*?\}/g;
           let match = tmp.text.match(regex);
           var odp = [];

          for (var i in tmp.blankSymbols) {
            odp[i] = '';
            for (var j in tmp.blankSymbols[i].answers){
              if (tmp.blankSymbols[i].answers[j].correct === true){
                odp[i] += tmp.blankSymbols[i].answers[j].answer
              }
            }
          }

          for (var k in match) {
            tmp.text = tmp.text.replace(match[k], '{' + odp[k] + '}')
          }
          return tmp;
        },*/
		getUser: state => state.user
	}
});
