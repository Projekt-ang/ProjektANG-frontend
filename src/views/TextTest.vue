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
              <div class="form-check" v-for="(answer, idx2) in question.answers" :key="idx2">
                <div class="row">
                  <div class="col-sm">
                    <input
                      type="radio"
                      class="form-check-input"
                      :name="'odp'+idx"
                      @change="setAnswer(answer,idx,idx2)"
                    >
                    <label class="form-check-label" for="'odp'+idx">{{answer.answer}}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <router-link :to="'/text-result'" class="col-12">
              <button class="btn-success col-12 mt-5" @click="checkAnswers">Zakończ test</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JQuery from "jquery";
let $ = JQuery;

//takie na szybko demko bez rozbijania tego na mniejsze komponenty
export default {
  name: "texttest",
  data() {
    return {
      test: {
        text: ""
      },
      answers: []
    };
  },
  methods: {
    setAnswer(answer, questionId, answerId) {
      this.answers[questionId] = {
        questionId: questionId,
        answerId: answerId,
        answer: answer
      };
    },

    checkAnswers() {
      let answersJson = {};
      answersJson.userId = this.user.id;
      answersJson.testId = this.$route.params.id;
      answersJson.answers = [];

      for (var i in this.answers) {
        answersJson.answers.push(this.findAnswer(this.answers[i]));
      }
      this.sendTest(answersJson);
    },

    findAnswer(answer) {
      let answerJson = answer.answer;
      for (var i in this.test.questions[answer.questionId].answers) {
        if (
          JSON.stringify(answerJson) ==
          JSON.stringify(this.test.questions[answer.questionId].answers[i])
        ) {
          return i;
        }
      }
    },

    sendTest(answersJson) {
      localStorage.currentText = JSON.stringify(answersJson);
      localStorage.currentTestId = this.$route.params.id;
      this.$req
        .post("/api/check-answers", answersJson)
        .then(function() {
          alert("Poprawnie wysłano test");
        })
        .catch(function() {
          alert("Wysłanie testu nie powiodło się");
        });
    },

    apiTest: function() {
      this.$req.get("/test").then(response => {
        this.response = response.data;
      });
    }
  },
  mounted() {
    this.$req
      .get("/api/readingVideoTest/" + this.$route.params.id)
      .then(response => {
        this.test.id = response.data.body.id;
        this.test.text = response.data.body.text;
        this.test.questions = response.data.body.questions;
        this.test.author = response.data.body.author;
        this.test.name = response.data.body.name;
        this.test.tags = response.data.body.tags;

        for (var i in this.test.questions) {
          this.test.questions[i].answers = _.shuffle(
            this.test.questions[i].answers
          );
        }
      });
  },
  computed: {
    user: function() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style>
li {
  list-style-type: none;
}
input[type="radio"] {
  transform: scale(0.5);
}
</style>
