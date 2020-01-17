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
            <tr v-for="(question,
							questionId) in test.questions" :key="questionId">
              <td>{{question.question}}</td>
              <td>{{question.answers[testAnswers.answers[questionId]].answer}}</td>
              <td>{{correct[questionId]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextResult",
  data() {
    return {
      testAnswers: undefined,
      testId: undefined,
      test: {},
      correct: [],
      points: 0,
      maxPoints: 0
    };
  },
  methods: {
    calculatePoints() {
      this.maxPoints = this.test.questions.length;
      for (var i = 0; i < this.maxPoints; i++) {
        if (
          this.correct[i] ==
          this.test.questions[i].answers[this.testAnswers.answers[i]].answer
        ) {
          this.points++;
        }
      }
    },

    correctAnswer() {
      for (var i in this.test.questions) {
        for (var j in this.test.questions[i].answers) {
          if (this.test.questions[i].answers[j].correct) {
            this.correct.push(this.test.questions[i].answers[j].answer);
          }
        }
      }
    }
  },
  mounted() {
    this.testAnswers = JSON.parse(localStorage.currentText);
    this.testId = localStorage.currentTestId;
    this.$req.get("/api/readingVideoTest/" + this.testId).then(response => {
      this.test.id = response.data.body.id;
      this.test.text = response.data.body.text;
      this.test.questions = response.data.body.questions;
      this.test.author = response.data.body.author;
      this.test.name = response.data.body.name;
      this.test.tags = response.data.body.tags;

      this.correctAnswer();
      this.calculatePoints();
    });
  }
};
</script>
