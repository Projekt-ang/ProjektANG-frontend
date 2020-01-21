<template>
  <div id="testPodglad" class="modal fade" role="dialog">
    <div class="modal-dialog mw-100 w-75">
      <div class="modal-content">
        <div class="modal-header">
          <a class="modal-title font-weight-bold">Wypełnij pola</a>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <p v-html="TestTmp.text"></p>
            <h3>Pytania</h3>
            <div class="row">
              <div class="col-6" v-for="(question, idx) in TestTmp.questions" :key="idx">
                <h4 class="m-2">{{question.question}}</h4>
                <div
                  class="form-check"
                  v-for="(answer, idx2) in question.answers"
                  :key="idx2"
                >
                  <div class="row">
                    <div class="col-sm">
                      {{answer.answer}}
                    </div>
                  </div>
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
  name: "RVTestPodglad",
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      t: {
        text: "",
        questions: []
      }
    }
  },
  computed: {
    TestTmp: {
      get: function() {
        if (this.id) {
          return this.$store.getters.getRVTestById(this.id);
        } else return this.t;
      },
      set: function() {}
    },
  }
};
</script>