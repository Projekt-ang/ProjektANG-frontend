<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Dodaj adres email</h1>
        {{this.response}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsertBlanks",
  data() {
    return {
      email: "",
      response: ""
    };
  },
  mounted() {
    this.$req
      .post("/api/confirm-token", { token: this.$route.params.token })
      .then(response => {
        alert("wyslano token do sprawdzenia");
        this.response = response;
      })
      .catch(() => {
        alert("Wystąpił błąd");
      });
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