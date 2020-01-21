<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Zaloguj się</h1>
      <label>Login</label>
      <input required v-model="username" type="text" placeholder="Username">
      <label>Hasło</label>
      <input required v-model="password" type="password" placeholder="Password">
      <div class="m-3">
        <button type="submit">Login</button>
      </div>
      <hr>
      <div class="row">
        <div class="col-12">
          <router-link :to="'/forgotten-password'">
            <button class="btn-primary mt-3 col-2">Nie pamiętam hasła</button>
          </router-link>
        </div>
      </div>
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
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>