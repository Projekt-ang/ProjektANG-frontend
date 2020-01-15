<template>
  <div id="app" v-cloak>
    <input type="file" ref="myFile" @change="selectedFile">
    <br>
  </div>
</template>

<script>
const csv = require("csvtojson");

export default {
  methods: {
    selectedFile() {
      console.log("selected a file");
      console.log(this.$refs.myFile.files[0]);

      let file = this.$refs.myFile.files[0];
      if (!file || file.type !== "text/csv") console.log("Tu wychodze");

      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = evt => {
        console.log(evt.target.result);
        csv({
          noheader: true,
          headers: ["firstName", "lastName"],
          output: "json"
        })
          .fromString(evt.target.result)
          .then(json => {
            req
              .post("/api/massRegister", json)
              .then(function() {
                alert("wysłano poprawnie");
              })
              .catch(function(error) {
                alert("Wystąpił błąd");
                console.log(error);
              });
          });
      };
      reader.onerror = evt => {
        console.error(evt);
      };
    }
  }
};
</script>