<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Dodawanie nowego testu tekstowego / wideo</h1>
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

          <div class="row">
            <input
              type="text"
              v-model="inputTag"
              class="form-control mb-2"
              placeholder="wprowadź nazwę tagu"
            >
          </div>

          <div id="tags" class="row">
            <span
              v-for="(tag,tagId) in filteredTags"
              :key="tagId"
              v-bind:class="{ 'colored-tag': isChecked(tag.text)}"
              @click="toggleTag(tag.text)"
              class="tag-class border mr-2 mb-2"
            >{{tag.text}}</span>

            <button
              type="button"
              @click="newTag"
              class="btn btn-primary mb-2 form-control"
            >Dodaj tag</button>
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
      allTags: [],
      inputTag: "",
      text: "",
      tagLimit: 25,
      correctAnswers: [],
      author: "",
      name: "",
      tags: [],
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
        answers: [
          {
            answer: "",
            correct: false
          }
        ]
      });
    },

    addAnswer(questionIdx) {
      this.questions[questionIdx].answers.push({
        answer: "",
        correct: false
      });
    },

    beginsWith(tagName) {
      return tagName.startsWith(this.inputTag);
    },

    newTag() {
      if (this.inputTag == "") return false;

      this.tags.push({
        text: this.inputTag
      });
      this.allTags.push({
        text: this.inputTag
      });

      this.allTags.sort(function(a, b) {
        return a.text > b.text;
      });
    },

    isChecked(tagName) {
      if (this.tags.find(element => element.text === tagName)) return true;
      return false;
    },

    prepareJson() {
      this.questions.forEach((question, idx) => {
        question.answers[this.correctAnswers[idx]].correct = true;
      });
      let fullTest = {
        questions: this.questions
      };

      fullTest.text = this.text;
      fullTest.author = this.author;
      fullTest.name = this.name;
      fullTest.tags = this.tags;
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
        .post("/api/readingVideoTest", fullTest)
        .then(function() {
          alert("Test wysłano poprawnie");
        })
        .catch(function(error) {
          console.log(error);
          alert(
            "Wystąpił błąd podczas przesyłania testu. Proszę spróbować ponownie"
          );
        });
    },

    toggleTag(tagName) {
      for (var i in this.tags) {
        if (this.tags[i].text == tagName) {
          this.tags.splice(i, 1);
          return true;
        }
      }
      this.tags.push({
        text: tagName
      });
    }
  },

  mounted() {
    this.$req.get("/tags").then(response => {
      this.allTags = response.data._embedded.tags;
    });
  },

  computed: {
    filteredTags: function() {
      let tags = this.allTags.filter(element => {
        return this.beginsWith(element.text);
      });

      if (tags.length > this.tagLimit) tags.splice(this.tagLimit);

      return tags;
    }
  }
};
</script>


<style>
input[type="radio"] {
  transform: scale(0.5);
}

.tag-class:hover {
  cursor: pointer;
}

.colored-tag {
  background-color: lawngreen;
}
</style>