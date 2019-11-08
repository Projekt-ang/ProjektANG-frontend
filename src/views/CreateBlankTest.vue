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

          <div class="row">
            <button type="button" @click="generateAnswers" class="col-12 btn-primary btn mt-2">
              Wygeneruj
              odpowiedzi
            </button>
          </div>

          <div class="row">
            <div class="col-6" v-for="(blank,blankId) in blankSymbols" :key="blankId">
              <div class="col-12 mt-2">Słowo: {{blankSymbols[blankId].answers[0].answer}}</div>
              <div class="col-12" v-for="(answers,answerId) in blank.answers" :key="answerId">
                <div class="row mt-2" v-if="answerId>0">
                  <input type="text" v-model="answers.answer" class="col-8">
                  <button
                    type="button"
                    @click="removeAnswer(blankId,answerId)"
                    class="col-2 btn form-control btn-danger"
                  >X</button>
                </div>
              </div>
              <div class="row">
                <button
                  type="button"
                  @click="addAnswer(blankId)"
                  class="col-10 btn btn-primary mt-2"
                >
                  Dodaj
                  odpowiedź
                </button>
              </div>
            </div>
          </div>
          <button type="submit" class="col-12 form-control btn btn-success mt-1 mb-3">Zatwierdź test</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsertBlanks",
  data() {
    return {
      name: "",
      author: "",
      text: "",
      allTags: [],
      tags: [],
      blankSymbols: [],
      inputTag: "",
      tagLimit: 25
    };
  },
  methods: {
    addAnswer(blankId) {
      this.blankSymbols[blankId].answers.push({
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

    generateAnswers() {
      let regex = /\{.*?\}/g;
      let match = this.text.match(regex);
      this.blankSymbols = [];
      for (var i in match) {
        this.blankSymbols.push({
          answers: []
        });

        match[i] = match[i].replace("{", "");
        match[i] = match[i].replace("}", "");

        this.blankSymbols[i].answers.push({
          answer: match[i],
          correct: true
        });
      }
    },

    prepareJson() {
      let blankTest = {
        name: this.name,
        author: this.author,
        text: this.text,
        blankSymbols: this.blankSymbols,
        tags: this.tags
      };

      let regex = /\{.*?\}/g;
      let match = this.text.match(regex);

      for (var i in match) {
        blankTest.text = blankTest.text.replace(match[i], "{" + i + "}");
      }

      return blankTest;
    },

    sendTest() {
      let fullTest = this.prepareJson();

      this.$req
        .post("/api/BlankInsertTest", fullTest)
        .then(() => {
          alert("poprawne wysłanie testu");
        })
        .catch(() => {
          alert("Wystąpił błąd");
        });
    },

    removeAnswer(blankId, answerId) {
      this.blankSymbols[blankId].answers.splice(answerId, 1);
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
.tag-class:hover {
  cursor: pointer;
}

.colored-tag {
  background-color: lawngreen;
}
</style>