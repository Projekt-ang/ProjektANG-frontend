<template>
  <div class="home">
    <div v-if="this.isLoggedIn">
      <home-user v-if="this.user.roles.indexOf('ROLE_USER') >= 0"/>
      <homeLektor v-else-if="this.user.roles.indexOf('ROLE_LEKTOR') >= 0"/>
      <home-admin v-else-if="this.user.roles.indexOf('ROLE_ADMIN') >= 0"/>
      <home-unconfirmed v-else-if="this.user.roles.indexOf('ROLE_UNCONFIRMED') >= 0"/>
    </div>
    <login v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import homeUser from "@/components/HomeUser.vue";
import homeLektor from "@/components/HomeLektor.vue";
import homeAdmin from "@/components/HomeAdmin.vue";
import login from "@/components/Login.vue";
import homeUnconfirmed from "@/views/EmailVerification.vue";

export default {
  name: "home",
  components: {
    homeUser,
    homeLektor,
    homeAdmin,
    homeUnconfirmed,
    login
  },
  data() {
    return {
      content: undefined
    };
  },
  methods: {},
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    user: function() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
