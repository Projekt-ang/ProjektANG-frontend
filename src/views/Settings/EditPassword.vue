<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Zmiana hasła</h1>
    </div>
    <div class="row">
      <form @submit.prevent="updatePassword" class="col-12">
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
</template>

<script>
export default {
  name: "EditPassword",
  data() {
    return {
      password: "",
      passwordConfirm: ""
    };
  },
  methods: {
    updatePassword() {
      if (this.password != this.passwordConfirm) {
        alert("hasła nie są takie same");
        return false;
      } else {
        let newPassword = {};
        newPassword.password = this.password;
        this.$req
          .post("/api/password-change", newPassword)
          .then(function() {
            alert("hasło zmieniono poprawnie");
          })
          .catch(function() {
            alert("błąd podczas aktualizacji hasła");
          });
      }
    }
  }
};
</script>