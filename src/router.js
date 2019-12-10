/*jshint node: true, esversion: 6 */
import Vue from "vue";
import Router from "vue-router";
import store from "./store";
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

Vue.use(Router);

let router = new Router({
  mode: "history",
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
      path: "/about/EditReadingVideoTest/:id",
      name: "EditReadingVideoTest",
      component: EditReadingVideoTest
    },
    {
      path: "/CreateBlankTest",
      name: "CreateBlankTest",
      component: CreateBlankTest,
      meta: {
        authorize: ["ROLE_UNCONFIRMED"]
      }
    },
    {
      path: "/CreateGlossaryDefinition",
      name: "CreateGlossaryDefinition",
      component: CreateGlossaryDefinition,
      meta: {
        authorize: ["ROLE_ADMIN"]
      }
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
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const user = store.state.user;

  if (authorize) {
    if (!user) {
      return next({ path: "/", query: { returnUrl: to.path } });
    }

    if (authorize.length && !authorize.some(r => user.roles.indexOf(r) >= 0)) {
      return next({ path: "/" });
    }
  }
  next();
});

export default router;
