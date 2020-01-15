<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Zmiana adresu e-mail</h1>
    </div>
    <div class="row">
      <form @submit.prevent="updateMail" class="col-12">
        <div class="row">
          <input
            type="text"
            v-model="mail"
            class="col-12 mt-2"
            placeholder="wprowadź nowy adres e-mail"
          >
        </div>
        <div class="row">
          <input
            type="text"
            v-model="mailConfirm"
            class="col-12 mt-2"
            placeholder="potwierdź nowy adres e-mail"
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
  name: "EditMail",
  data() {
    return {
      mail: "",
      mailConfirm: ""
    };
  },
  methods: {
    updateMail() {
      if (this.mail != this.mailConfirm) {
        alert("hasła nie są takie same");
        return false;
      } else {
        let newMail = {};
        newMail["e-mail"] = this.mail;
        this.$req
          .post("/api/password-change", newMail)
          .then(function() {
            alert("e-mail zmieniony poprawnie");
          })
          .catch(function() {
            alert("błąd podczas aktualizacji adresu e-mail");
          });
      }
    }
  }
};
</script>