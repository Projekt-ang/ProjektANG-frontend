<template>
  <div id="app" v-cloak>
    <div class="m-5">
      <input type="file" ref="myFile">
      <div class="m-4 row">
        <div class="col-sm">
          Nazwa Grupy:
          <input type="text" v-model="value" required>
        </div>
      </div>
      <div class="m-3 row">
        <div class="col-sm">
          <button
            type="submit"
            class="col-8 form-control btn btn-success mt-1 mb-3"
            @click="selectedFile"
          >Stworz Uzytkownikow</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const csv = require("csvtojson");
export default {
  data() {
    return {
      value: undefined
    };
  },
  methods: {
    selectedFile() {
      console.log("selected a file");
      console.log(this.$refs.myFile.files[0]);

      let file = this.$refs.myFile.files[0];
      let group = this.value;
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
            let file_sent = {
              users: json,
              role: group
            }
            console.log(file_sent)
            this.$req
              .post("/api/massRegister", file_sent)
              .then( response => {
                let loginy = JSON.stringify(response.data, null, 2);
                loginy = loginy.replace("{", "")
                loginy = loginy.replace("}", "")
                loginy = loginy.replace(/['"]+/g, '')

                console.log(loginy)
                this.downloadString(loginy, "text/txt", group+".txt")
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
    },
    downloadString(text, fileType, fileName) {
      var blob = new Blob([text], { type: fileType });
      var a = document.createElement('a');
      a.download = fileName;
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
    }
  }
};
</script>