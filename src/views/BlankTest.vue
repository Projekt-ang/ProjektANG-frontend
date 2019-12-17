<template>
  <div class="blankTest">
    <div v-if="test">
      <h2>Przeczytaj tekst i w lukach wybierz odpowiednie odpowiedzi</h2>
      <div class="m-5">
        <div class="row d-flex justify-content-center">
          <div class="col-10" v-html="processedHtml">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "BlankTest",
  data() {
    return {
      test: undefined
    };
  },
  methods: {},
 
  mounted() {

    this.$req
      .get("/blankInsertTests/" + this.$route.params.id)
      .then(response => {
        this.test = response.data;
      });
      
  },
 
  computed: {
    processedHtml () {
      let regex = /\{.*?\}/g;
      let match = this.test.text.match(regex);
      let converted = this.test.text;

      var odp = [];
      for (var k in this.test.blankSymbols){
        odp[k] = [];
        for (var l in this.test.blankSymbols[k].answers){
          odp[k][l] = (this.test.blankSymbols[k].answers[l].answer)
        }
      }
      var select = [];

      for (var m in odp) {
        select[m] = "";
        select[m] += "<select>";
        for (var n in odp[m]){
          select[m] += "<option>" + odp[m][n] + "</option>";
        }
        select[m] += "</select>";
      }

      for (var i in match) {
        converted = converted.replace(match[i], select[i]);
      }
      return converted;
    }
  }
};
</script>
 
<style>
li {
  list-style-type: none;
}
</style>