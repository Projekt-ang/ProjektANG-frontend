<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Resetowanie hasła</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="resetPassword" class="col-12">
          <div class="row">
            <input
              type="text"
              v-model="password"
              class="col-12 mt-2"
              placeholder="Wprowadź nowe hasło"
            >
          </div>
          <div class="row">
            <input
              type="text"
              v-model="passwordConfirm"
              class="col-12 mt-2"
              placeholder="potwierdź nowe hasło"
            >
          </div>
          <div class="row">
            <button type="submit" class="form-control btn-success col-12 mt-3">Zatwierdź</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordReset",
  data() {
    return {
      password: "",
      passwordConfirm: "",
      token: ""
    };
  },
  methods: {
    resetPassword() {
      if (this.password != this.passwordConfirm) {
        alert("hasła nie są takie same");
        return false;
      } else {
        let newPassword = {};
        newPassword.token = this.token;
        newPassword.password = this.password;
        this.$req
          .post("/api/password-reset", newPassword)
          .then(function() {
            alert("hasło zresetowane i ustawione poprawnie");
          })
          .catch(function() {
            alert("błąd podczas tworzenia nowego hasła");
          });
      }
    },
    mounted() {
      this.token = this.$route.params.token;
    }
  }
};
</script>