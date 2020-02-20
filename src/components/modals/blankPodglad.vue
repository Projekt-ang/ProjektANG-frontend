<template>
  <div id="blankPodglad" class="modal fade" role="dialog">
    <div class="modal-dialog mw-100 w-75">
      <div class="modal-content">
        <div class="modal-header">
          <a class="modal-title font-weight-bold">Podglad testu: {{blankTmp.name}}</a>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="m-5">
              <div class="row d-flex justify-content-center">
                <div class="col-10" v-html="processedHtml">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "blankPodglad",
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      t: {
        text: "",
        blankSymbols: []
      }
    }
  },
  computed: {
    blankTmp: {
      get: function() {
        if (this.id) {
          return this.$store.getters.getBlankById(this.id);
        } else return this.t;
      },
      set: function() {}
    },
    processedHtml() {
      let regex = /\{.*?\}/g;
      let match = this.blankTmp.text.match(regex);
      let converted = this.blankTmp.text;
      var odp = [];
      for (var k in this.blankTmp.blankSymbols){
        odp[k] = [];
        for (var l in this.blankTmp.blankSymbols[k].answers){
          odp[k][l] = (this.blankTmp.blankSymbols[k].answers[l].answer)
        }
      }
      //odpowiedzi w losowej kolejnosci
      for (var d in odp) {
        odp[d] = _.shuffle(odp[d]);
      }
      var select = [];
      for (var m in odp) {
        select[m] = "";
        select[m] += "<select>";
        select[m] += "<option> </option>"
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