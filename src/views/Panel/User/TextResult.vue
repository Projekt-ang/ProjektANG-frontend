<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Wyniki ostatniego testu</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <h1>Twój wynik to {{points + " / " + maxPoints}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
          <thead>
            <th>Pytanie</th>
            <th>Twoja odpowiedź</th>
            <th>Poprawna odpowiedź</th>
          </thead>
          <tbody>
            <tr v-for="(question,questionId) in test.questions" :key="questionId">
              <td
                v-bind:class="{'colored-answer': coloringAnswer(correctAnswers[questionId],userAnswers[questionId])}"
              >{{question.question}}</td>
              <td
                v-bind:class="{'colored-answer': coloringAnswer(correctAnswers[questionId],userAnswers[questionId])}"
              >{{correctAnswers[questionId]}}</td>
              <td
                v-bind:class="{'colored-answer': coloringAnswer(correctAnswers[questionId],userAnswers[questionId])}"
              >{{userAnswers[questionId]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Texttest",
  data() {
    return {
      points: 0,
      maxPoints: 0,
      test: {},
      userAnswers: [],
      correctAnswers: [],
      testAnswers: {}
    };
  },
  methods: {
    correctAnswer() {
      for (var i in this.test.questions) {
        for (var j in this.test.questions[i].answers) {
          if (this.test.questions[i].answers[j].correct == true) {
            this.correctAnswers.push(this.test.questions[i].answers[j].answer);
          }
        }
      }
    },
    coloringAnswer(correct, user) {
      if (correct == user) return true;
      else return false;
    },
    calculatePoints() {
      for (var i in this.userAnswers) {
        if (this.userAnswers[i] == this.correctAnswers[i]) {
          this.points++;
        }
      }
      this.maxPoints = this.userAnswers.length;
    },
    userAnswersList() {
      for (var i in this.test.questions) {
        for (var j in this.test.questions[i].answers) {
          if (
            this.test.questions[i].answers[j].id ==
            this.testAnswers.answerIds[i]
          ) {
            this.userAnswers.push(this.test.questions[i].answers[j].answer);
          }
        }
      }
    }
  },
  mounted() {
    this.testAnswers = JSON.parse(localStorage.currentText);
    console.log(this.testAnswers);
    this.testId = localStorage.currentTestId;
    this.$req.get("/api/readingVideoTest/" + this.testId).then(response => {
      this.test.id = response.data.body.id;
      this.test.text = response.data.body.text;
      this.test.questions = response.data.body.questions;
      this.test.author = response.data.body.author;
      this.test.name = response.data.body.name;
      this.test.tags = response.data.body.tags;
      this.correctAnswer();
      this.userAnswersList();
      this.calculatePoints();
    });
  }
};
</script>

<style>
.colored-answer {
  background-color: lawngreen;
}
</style>