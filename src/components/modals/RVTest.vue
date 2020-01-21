<template>
  <div id="RVTest" class="modal fade" role="dialog">
    <div class="modal-dialog mw-100 w-75">
      <div class="modal-content">
        <div class="modal-header">
          <a class="modal-title font-weight-bold">Wypełnij pola</a>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h1>Test tekstowy / wideo</h1>
                <form @submit.prevent="zapisz()" id="ReadVideoTest" class="col-12">
                  <div class="row">
                    <div class="col-1"/>
                    <input
                      type="text"
                      class="col-5 form-control m-2"
                      v-model="TestTmp.name"
                      placeholder="Tytuł"
                      required
                    >
                    <input
                      type="text"
                      class="col-5 form-control m-2"
                      v-model="TestTmp.author"
                      placeholder="Autor"
                      required
                    >
                    <div class="col-1"/>
                  </div>

                  <div class="row">
                    <input
                      type="text"
                      v-model="TestTmp.inputTag"
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

                  <vue-editor v-model="TestTmp.text" required/>
                  <h3 class="m-4">Pytania:</h3>
                  <div class="row">
                    <div
                      class="col-6"
                      v-for="(question, questionIdx) in TestTmp.questions"
                      :key="questionIdx"
                    >
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
                        v-for="(answer, answerIdx) in question.answers"
                        :key="answerIdx"
                      >
                        <p class="row">
                          <input
                            type="radio"
                            class="col-1 form-control"
                            v-model="correctAnswers[questionIdx]"
                            :name="question + questionIdx"
                            :value="answerIdx"
                            :checked="poprawneOdpowiedzi[questionIdx]"
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
                            @click="removeAnswer(questionIdx, answerIdx)"
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
                  <button
                    type="button"
                    class="btn btn-primary m-1"
                    @click="addQuestion"
                  >Nowe pytanie</button>
                  <br>
                  <button
                    type="submit"
                    class="col-3 form-control btn btn-success mt-1 mb-3"
                  >Zatwierdź test</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JQuery from "jquery";
let $ = JQuery;

export default {
  name: "ReadVideo",
  props: {
    id: {
      required: false
    }
  },
  data() {
    return {
      t: {
        inputTag: "",
        tagLimit: 25,
        tags: [],
        text: "",
        name: "",
        author: "",
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
      },
      allTags: [],
      allTagsTmp: [],
      correctAnswers: []
    };
  },
  methods: {
    addAnswer(questionIdx) {
      this.TestTmp.questions[questionIdx].answers.push({
        answer: "",
        correct: false
      });
    },
    addQuestion() {
      this.TestTmp.questions.push({
        question: "",
        answers: [
          {
            answer: "",
            correct: false
          }
        ]
      });
    },
    beginsWith(tagName) {
      return tagName.startsWith(this.TestTmp.inputTag);
    },

    newTag() {
      if (this.TestTmp.inputTag == "") return false;

      this.TestTmp.tags.push({
        text: this.TestTmp.inputTag
      });
      this.allTagsTmp.push({
        text: this.TestTmp.inputTag
      });

      this.allTagsTmp.sort(function(a, b) {
        return a.text > b.text;
      });
    },

    isChecked(tagName) {
      if (this.TestTmp.tags.find(element => element.text === tagName))
        return true;
      return false;
    },

    prepareJson() {
      this.TestTmp.questions.forEach((question, idx) => {
        question.answers.forEach(answer => {
          answer.correct = false;
        });
        question.answers[this.correctAnswers[idx]].correct = true;
      });
      let fullTest = {
        questions: this.TestTmp.questions
      };

      fullTest.text = this.TestTmp.text;
      fullTest.name = this.TestTmp.name;
      fullTest.author = this.TestTmp.author;
      fullTest.tags = this.TestTmp.tags;
      return fullTest;
    },

    removeAnswer(question_id, answer_id) {
      this.TestTmp.questions[question_id].answers.splice(answer_id, 1);
    },

    removeQuestion(question_id) {
      this.TestTmp.questions.splice(question_id, 1);
    },

    sendTest() {
      let fullTest = this.prepareJson();
      this.$req
        .post("/api/readingVideoTest", fullTest)
        .then(() => {
          alert("Test wysłano poprawnie");
          this.$store.dispatch("loadRVTests");
        })
        .catch(function(error) {
          console.log(error);
          alert(
            "Wystąpił błąd podczas przesyłania testu. Proszę spróbować ponownie"
          );
        });
    },
    editTest() {
      let fullTest = this.prepareJson();
      this.$req
        .put("/api/readingVideoTest/" + this.id, fullTest)
        .then(() => {
          alert("poprawna edycja testu");
          this.$store.dispatch("loadRVTests");
        })
        .catch(() => {
          alert("Wystąpił błąd");
        });
    },

    toggleTag(tagName) {
      for (var i in this.TestTmp.tags) {
        if (this.TestTmp.tags[i].text == tagName) {
          this.TestTmp.tags.splice(i, 1);
          return true;
        }
      }
      this.TestTmp.tags.push({
        text: tagName
      });
    },

    zapisz: function() {
      $("#RVTest").modal("toggle");
      if (this.id) {
        this.editTest();
      } else {
        this.sendTest();
      }
    }
  },
  mounted() {
    if (this.id) this.TestTmp = this.$store.getters.getRVTestById(this.id);
    this.$req.get("/tags").then(response => {
      this.allTagsTmp = response.data._embedded.tags;
    });
    //this.allTagsTmp = this.$store.getters.tags;
  },
  computed: {
    getTags() {
      return this.$store.getters.tags;
    },
    filteredTags: function() {
      this.allTagsTmp = this.getTags;
      let tags = this.allTagsTmp.filter(element => {
        return this.beginsWith(element.text);
      });

      if (tags.length > this.TestTmp.tagLimit)
        tags.splice(this.TestTmp.tagLimit);

      return tags;
    },

    TestTmp: {
      get: function() {
        if (this.id) {
          return this.$store.getters.getRVTestById(this.id);
        } else return this.t;
      },
      set: function() {}
    },
    poprawneOdpowiedzi: function() {
      let correctAnswers = [];
      if (this.id) {
        this.TestTmp.questions.forEach((question, idx) => {
          question.answers.forEach((answer, idx2) => {
            if (answer.correct === true) {
              correctAnswers[idx] = idx2;
            }
          });
        });
        this.correctAnswers = correctAnswers;
        return correctAnswers;
      } else {
        this.correctAnswers = [];
        return correctAnswers;
      }
    }
  }
};
</script>

<style>
.tag-class:hover {
  cursor: pointer;
}

.colored-tag {
  background-color: lawngreen;
}
</style>