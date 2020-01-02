/*jshint node: true, esversion: 6 */
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import TextTest from "./views/TextTest.vue";
import CreateReadingVideoTest from "./views/CreateReadingVideoTest.vue";
import EditReadingVideoTest from "./views/EditReadingVideoTest.vue";
import CreateBlankTest from "./views/CreateBlankTest.vue";
import CreateGlossaryDefinition from "./views/CreateGlossaryDefinition.vue";
import ReadGlossary from "./views/ReadGlossary.vue";
import EditGlossary from "./views/EditGlossary.vue";
import EmailVerification from "./views/EmailVerification.vue";
import Verified from "./views/Verified.vue";
import LektorUsers from "./views/Panel/Lektor/Users.vue";
import LektorContentManagement from "./views/Panel/Lektor/ContentManagement.vue";
import UsersManagement from "./views/Panel/Lektor/UsersManagement.vue";
import Register from "./views/Panel/Lektor/Register.vue";
import TestsManagement from "./views/Crud/Tests.vue";
import GlossaryManagement from "./views/Crud/Glossary.vue";
import BlankCRUD from "./views/Crud/Tests/Blank.vue";
import RVCrud from "./views/Crud/Tests/ReadingVideo.vue";
Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/about",
			name: "about",
			component: About
		},
		{
			path: "/about/:id",
			name: "test",
			component: TextTest
		},
		{
			path: "/CreateReadingVideoTest",
			name: " CreateReadingVideoTest",
			component: CreateReadingVideoTest
		},
		{
			path: "/EditReadingVideoTest/:id",
			name: "EditReadingVideoTest",
			component: EditReadingVideoTest
		},
		{
			path: "/CreateBlankTest",
			name: "CreateBlankTest",
			component: CreateBlankTest
		},
		{
			path: "/CreateGlossaryDefinition",
			name: "CreateGlossaryDefinition",
			component: CreateGlossaryDefinition
		},
		{
			path: "/ReadGlossary",
			name: "ReadGlossary",
			component: ReadGlossary
		},
		{
			path: "/EditGlossary/:id",
			name: "EditGlossary",
			component: EditGlossary
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
			path: "/Panel/Lektor/Users",
			name: "Users",
			component: LektorUsers
		},
		{
			path: "/Panel/Lektor/ContentManagement",
			name: "ContentManagement",
			component: LektorContentManagement
		},
		{
			path: "/Panel/Lektor/Users/UsersManagement",
			name: "UsersManagement",
			component: UsersManagement
		},
		{
			path: "/Panel/Lektor/Users/Register",
			name: "Register",
			component: Register
		},
		{
			path: "/Crud/Tests",
			name: "Tests",
			component: TestsManagement
		},
		{
			path: "/Crud/Glossary",
			name: "Glossary",
			component: GlossaryManagement
		},
		{
			path: "/Crud/Tests/Blank",
			name: "BlankCrud",
			component: BlankCRUD
		},
		{
			path: "/Crud/Tests/ReadingVideo",
			name: "ReadingVideoCrud",
			component: RVCrud
		}
	]
});
