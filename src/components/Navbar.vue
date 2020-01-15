<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
    id="ftco-navbar"
  >
    <div class="container">
      <router-link class="navbar-brand" to="/">ProjektANG</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#ftco-nav"
        aria-controls="ftco-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="oi oi-menu"></span> Menu
      </button>

      <div class="collapse navbar-collapse" id="ftco-nav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active" v-if="role === 'USER'">
            <router-link to="/" class="nav-link">Panel użytkownika</router-link>
          </li>
          <li class="nav-item active" v-if="role === 'LEKTOR'">
            <router-link to="/" class="nav-link">Panel lektora</router-link>
          </li>
          <li class="nav-item active" v-if="role === 'ADMIN'">
            <router-link to="/" class="nav-link">Panel administracyjny</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/settings" class="nav-link">Ustawienia</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a href="#" v-on:click="logout" class="nav-link">Wyloguj się</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    role: function() {
      return this.$store.getters.getRole;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>