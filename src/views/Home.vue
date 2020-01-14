<template>
  <div class="home">
    <home-user v-if="role === 'USER'"/>
    <homeLektor v-else-if="role === 'LEKTOR'"/>
    <home-admin v-else-if="role === 'ADMIN'"/>
    <login v-else/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import homeUser from "@/components/HomeUser.vue";
import homeLektor from "@/components/HomeLektor.vue";
import homeAdmin from "@/components/HomeAdmin.vue";
import login from "@/components/Login.vue";

export default {
  name: "home",
  components: {
    homeUser,
    homeLektor,
    homeAdmin,
    login
  },
  data() {
    return {
      content: undefined
    };
  },
  methods: {
    testApi: function() {
      axios.get("http://localhost:8080/test").then(response => {
        this.content = response.data;
      });
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    role: function() {
      // return this.$store.getters.getRole;
      return "USER";
    }
  }
};
</script>
