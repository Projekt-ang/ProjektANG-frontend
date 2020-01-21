/*jshint node: true, esversion: 6 */
import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";
import TextTest from "./views/TextTest.vue";
import CreateGlossaryDefinition from "./views/CreateGlossaryDefinition.vue";
import ReadGlossary from "./views/ReadGlossary.vue";
import EditGlossary from "./views/EditGlossary.vue";
import EmailVerification from "./views/EmailVerification.vue";
import Verified from "./views/Verified.vue";
import LektorUsers from "./views/Panel/Lektor/Users.vue";
import LektorContentManagement from "./views/Panel/Lektor/ContentManagement.vue";
import UsersManagement from "./views/Panel/Lektor/UsersManagement.vue";
import MassRegister from "./views/MassRegister.vue";
import TestsManagement from "./views/Crud/Tests.vue";
import GlossaryManagement from "./views/Crud/Glossary.vue";
import BlankCRUD from "./views/Crud/Tests/Blank.vue";
import RVCrud from "./views/Crud/Tests/ReadingVideo.vue";
import Testy from "./views/Panel/User/Testy.vue";
import EditUser from "./views/EditUser.vue";
import Settings from "./views/Settings.vue";
import Results from "./views/Results.vue";
import EditPassword from "./views/Settings/EditPassword.vue";
import EditMail from "./views/Settings/EditMail.vue";
import PasswordReset from "./views/Settings/PasswordReset.vue";
import ForgottenPassword from "./views/ForgottenPassword.vue";
import TextResult from "./views/Panel/User/TextResult.vue";
import BlankTest from "./views/BlankTest.vue";
import Register from "./views/Register.vue";
import ListaBlanks from "./views/Panel/User/ListaBlanks.vue";
import ListaRVT from "./views/Panel/User/ListaRVT.vue";

Vue.use(Router);

let router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/reading-video-test/:id",
			name: "test",
			component: TextTest
		},
		{
			path: "/create-glossary-definition",
			name: "CreateGlossaryDefinition",
      component: CreateGlossaryDefinition,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/read-glossary",
			name: "ReadGlossary",
      component: ReadGlossary,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/edit-glossary/:id",
			name: "EditGlossary",
      component: EditGlossary,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/add-email",
			name: "EmailVerification",
			component: EmailVerification
		},
		{
			path: "/verify/:token",
			name: "Verified",
			component: Verified
		},
		{
			path: "/panel/lektor/users",
			name: "Users",
      component: LektorUsers,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/panel/lektor/content-management",
			name: "ContentManagement",
      component: LektorContentManagement,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/panel/lektor/users/users-management",
			name: "UsersManagement",
      component: UsersManagement,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/mass-register",
			name: "MassRegister",
      component: MassRegister,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/crud/tests",
			name: "TestsCrud",
      component: TestsManagement,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/crud/glossary",
			name: "Glossary",
      component: GlossaryManagement,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/crud/tests/blank",
			name: "BlankCrud",
      component: BlankCRUD,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
		},
		{
			path: "/crud/tests/reading-video",
			name: "ReadingVideoCrud",
      component: RVCrud,
      meta: {
        authorize: ["ROLE_LEKTOR", "ROLE_ADMIN"]
      }
		},
		{
			path: "/tests",
			name: "Tests",
			component: Testy
		},
		{
			path: "/edit-user/:id",
			name: "EditUser",
      component: EditUser,
      meta: {
        authorize: ["ROLE_ADMIN"]
      }
		},
		{
			path: "/settings",
			name: "Settings",
			component: Settings
		},
		{
			path: "/results",
			name: "Results",
			component: Results
		},
		{
			path: "/edit-password",
			name: "EditPassword",
			component: EditPassword
		},
		{
			path: "/edit-mail",
			name: "EditMail",
			component: EditMail
		},
		{
			path: "/password-reset/:token",
			name: "PasswordReset",
			component: PasswordReset
		},
		{
			path: "/forgotten-password",
			name: "ForgottenPassword",
			component: ForgottenPassword
		},
		{
			path: "/text-result",
			name: "TextResult",
			component: TextResult
		},
		{
			path: "/blank-test/:id",
			name: "BlankTest",
			component: BlankTest
		},
		{
			path: "/register",
			name: "Register",
      component: Register,
      meta: {
        authorize: ["ROLE_ADMIN", "ROLE_LEKTOR"]
      }
    },
    {
      path: "/tests/blank-tests",
      name: "ListaBlanks",
      component: ListaBlanks
    },
    {
      path: "/tests/reading-video-tests",
      name: "ListaRVT",
      component: ListaRVT,
    }
	]
});

/*
w siezkach ktore maja byc zabezpieczone dodajemy:
meta: {
        authorize: ["ROLE_LEKTOR"]
	  }
*/

router.beforeEach((to, from, next) => {
	const { authorize } = to.meta;
	const user = store.state.user;

	if (authorize) {
		if (!user) {
			return next({
				path: "/",
				query: { returnUrl: to.path }
			});
		}

		if (
			authorize.length &&
			!authorize.some(
				r => user.roles.indexOf(r) >= 0
			)
		) {
			return next({ path: "/" });
		}
	}
	next();
});

export default router;
