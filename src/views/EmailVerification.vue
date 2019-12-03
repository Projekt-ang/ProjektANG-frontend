<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Dodaj adres email</h1>
        <form @submit.prevent="sendEmail" id="ReadVideoTest" class="col-12">
          <div class="row">
            <div class="col-3"/>
            <input
              type="text"
              class="col-6 form-control m-2"
              v-model="email"
              placeholder="Email"
              required
            >
            <div class="col-3"/>
          </div>
          <button
            type="submit"
            class="col-12 form-control btn btn-success mt-1 mb-3"
          >Zatwierdź email</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsertBlanks",
  data() {
    return {
      email: ""
    };
  },
  methods: {
    sendEmail() {
      this.$req
        .post("/api/generate-token", { email: this.email })
        .then(() => {
          alert("email wysłany sprawdź skrzynkę");
        })
        .catch(() => {
          alert("Wystąpił błąd");
        });
    }
  }
};
</script>


<style>
.tag-class:hover {
  cursor: pointer;
}

.colored-tag {
  background-color: lawngreen;
}
</style>