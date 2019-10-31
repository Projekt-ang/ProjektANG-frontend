<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Edycja testu tekstowego / wideo</h1>
        <form @submit.prevent="sendTest" id="ReadVideoTest" class="col-12">
          <div class="row">
            <div class="col-1"/>
            <input
              type="text"
              class="col-5 form-control m-2"
              v-model="name"
              placeholder="Tytuł"
              required
            >
            <input
              type="text"
              class="col-5 form-control m-2"
              v-model="author"
              placeholder="Autor"
              required
            >
            <div class="col-1"/>
          </div>
          <vue-editor v-model="text" required/>
          <h3 class="m-4">Pytania:</h3>
          <div class="row">
            <div class="col-6" v-for="(question,questionIdx) in questions" :key="questionIdx">
              <div class="row">
                <input
                  type="text"
                  class="col-10 form-control mb-2"
                  v-model="question.question"
                  placeholder="Pytanie"
                  required
                >
                <button
                  type="button"
                  class="btn btn-danger form-control col-1"
                  title="Usuń to pytanie"
                  @click="removeQuestion(questionIdx)"
                >X</button>
              </div>
              <div
                class="answers form-check"
                v-for="(answer,answerIdx) in question.answers"
                :key="answerIdx"
              >
                <p class="row">
                  <input
                    type="radio"
                    class="col-1 form-control"
                    v-model="correctAnswers[questionIdx]"
                    :name="question+questionIdx"
                    :value="answerIdx"
                    :checked="correctAnswers[questionIdx]"
                    required
                  >
                  <input
                    type="text"
                    class="col-7 form-control"
                    v-model="answer.answer"
                    placeholder="Odpowiedź"
                    required
                  >
                  <button
                    class="btn btn-danger col-1 form-control"
                    type="button"
                    @click="removeAnswer(questionIdx,answerIdx)"
                    title="Usuń tę odpowiedź"
                  >X</button>
                </p>
              </div>
              <button
                @click="addAnswer(questionIdx)"
                class="new-answer btn btn-primary mb-3"
                type="button"
              >Nowa odpowiedź</button>
            </div>
          </div>
          <button type="button" class="btn btn-primary m-1" @click="addQuestion">Nowe pytanie</button>
          <br>
          <button type="submit" class="col-3 form-control btn btn-success mt-1 mb-3">Zatwierdź test</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadingVideoTest",
  data() {
    return {
      id: undefined,
      text: "",
      name: "",
      author: "",
      correctAnswers: [],
      questions: [
        {
          question: "",
          answers: [
            {
              answer: "",
              correct: false
            }
          ]
        }
      ]
    };
  },

  methods: {
    addQuestion() {
      this.questions.push({
        question: "",
        answers: [{ answer: "", correct: false }]
      });
    },

    addAnswer(questionIdx) {
      this.questions[questionIdx].answers.push({ answer: "", correct: false });
    },

    prepareJson() {
      this.questions.forEach((question, idx) => {
        question.answers.forEach(answer => {
          answer.correct = false;
        });
        question.answers[this.correctAnswers[idx]].correct = true;
      });
      let fullTest = {
        questions: this.questions
      };

      fullTest.text = this.text;
      fullTest.name = this.name;
      fullTest.author = this.author;
      return fullTest;
    },

    removeAnswer(question_id, answer_id) {
      this.questions[question_id].answers.splice(answer_id, 1);
    },

    removeQuestion(question_id) {
      this.questions.splice(question_id, 1);
    },

    sendTest() {
      let fullTest = this.prepareJson();
      this.$req
        .put("/api/readingVideoTest/" + this.id, fullTest)
        .then(function() {
          alert("Test wysłano poprawnie");
        })
        .catch(function(error) {
          console.log(error);
          alert(
            "Wystąpił błąd podczas przesyłania testu. Proszę spróbować ponownie"
          );
        });
    }
  },
  mounted() {
    this.$req
      .get("/readingVideoTests/" + this.$route.params.id)
      .then(response => {
        this.id = response.data.id;
        this.text = response.data.text;
        this.questions = response.data.questions;
        this.author = response.data.author;
        this.name = response.data.name;

        this.questions.forEach((question, idx) => {
          question.answers.forEach((answer, idx2) => {
            if (answer.correct === true) {
              this.correctAnswers[idx] = idx2;
            }
          });
        });
      })
      .catch(errors => {
        console.log(errors);
      });
  }
};
</script>

<style>
input[type="radio"] {
  transform: scale(0.5);
}
</style>