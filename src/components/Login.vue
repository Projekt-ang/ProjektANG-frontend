<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Zaloguj się</h1>
      <label>Login</label>
      <input required v-model="username" type="text" placeholder="Username">
      <label>Hasło</label>
      <input required v-model="password" type="password" placeholder="Password">
      <hr>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .catch(err => console.log(err));
    }
  }
};
</script>