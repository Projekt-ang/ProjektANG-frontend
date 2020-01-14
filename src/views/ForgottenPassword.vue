<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Reset hasła</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="resetPassword" class="col-12">
          <div class="row">
            <input
              type="text"
              class="col-12"
              v-model="mail"
              placeholder="wprowadź adres e-mail twojego konta"
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
  name: "ForgottenPassword",
  data() {
    return {
      mail: ""
    };
  },
  methods: {
    resetPassword() {
      let resetFor = {};
      resetFor["e-mail"] = this.mail;
      this.$req
        .post("/api/password-generate-token", resetFor)
        .then(function() {
          alert("żądanie poprawne. Sprawdź swój e-mail");
        })
        .catch(function() {
          alert("Wystąpił błąd. Spróbuj jeszcze raz");
        });
    }
  }
};
</script>