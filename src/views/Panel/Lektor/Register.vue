<template>
  <div class="containter">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="sendFile" name="registerForm">
          <h1>Proszę wybrać plik z danymi do rejestracji</h1>
          <input type="file" name="registerFile" accept=".csv">
          <br>
          <input type="submit" class="btn-success form-control col-12 mt-3" value="wyślij">
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Register",
  data() {
    return {};
  },
  methods: {
    sendFile() {
      let inputFile = document.forms["registerForm"]["registerFile"].files[0];

      this.$req
        .post("/api/massRegister", inputFile)
        .then(function() {
          alert("Listę użytkowników wysłano poprawnie.");
        })
        .catch(function() {
          alert("Nastąpił błąd podczas wysyłania listy użytkowników.");
        });
    }
  }
};
</script>