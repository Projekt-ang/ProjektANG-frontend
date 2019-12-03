<template>
  <div class="align-middle">
    <div v-if="test">
      <div class="row d-flex justify-content-center">
        <h2>Przeczytaj tekst i odpowiedz na pytania</h2>
        <div class="col-md-9">
          <p v-html="this.test.text"></p>
          <h3>Pytania</h3>
          <div class="row">
            <div class="col-6" v-for="(question, idx) in this.test.questions" :key="idx">
              <h4 class="m-2">{{question.question}}</h4>
              <div
                class="form-check"
                v-for="(answer, idx2) in question.answers"
                :key="idx2"
              >
                <p class="row">
                  <div class="col-sm">
                    <input type="radio" class="form-check-input" :name="'odp'+idx">
                    <label class="form-check-label" for="'odp'+idx">
                      {{answer.answer}}
                    </label>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//takie na szybko demko bez rozbijania tego na mniejsze komponenty
export default {
  name: "texttest",
  data() {
    return {
      test: undefined
    };
  },
  methods: {
    apiTest: function() {
      this.$req.get("/test").then(response => {
        this.response = response.data;
      });
    }
  },
  mounted() {
    this.$req
      .get("/readingVideoTests/" + this.$route.params.id)
      .then(response => {
        this.test = response.data;
      });
  }
};
</script>

<style>
li {
  list-style-type: none;
}
input[type="radio"] {
  transform:scale(0.5);
}
</style>
