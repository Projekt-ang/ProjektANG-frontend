<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Edytowanie testu z lukami</h1>
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
            <div class="col-6" v-for="(blank,blankId) in tempBlanks" :key="blankId">
              <div>Luka {{ blank }}</div>
              <div class="row">
                <div
                  class="col-12 mt-2"
                  v-for="(answer,answerId) in blankSymbols[blankId].answers"
                  :key="answerId"
                >
                  <input type="text" class="col-9 mr-2" v-if="answerId>0" v-model="answer.answer">
                  <button
                    type="button"
                    class="col-2 btn-danger"
                    @click="removeAnswer(blankId,answerId)"
                    v-if="answerId>0"
                  >X</button>
                </div>
              </div>
              <button
                type="button"
                class="btn-primary mt-3"
                @click="addAnswer(blankId)"
              >Dodaj odpowiedź</button>
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
    this.$req
      .get("/blankInsertTests/" + this.$route.params.id)
      .then(response => {
        this.name = response.data.name;
        this.text = response.data.text;
        this.author = response.data.author;
        this.blankSymbols = response.data.blankSymbols;
        
        //zamiana {0} {1} itd na poprawne odpowiedzi w tekscie
        let regex = /\{.*?\}/g;
        let match = this.text.match(regex);
        var odp = [];
        for (var i in this.blankSymbols) {
          odp[i] = '';
          for (var j in this.blankSymbols[i].answers){
            if (this.blankSymbols[i].answers[j].correct === true){
              odp[i] += '{';
              odp[i] += this.blankSymbols[i].answers[j].answer
              odp[i] += '}';
            }
          }
        }
        for (var k in match) {
          this.text = this.text.replace(match[k], odp[k])
        }

      });
  },
  computed: {
    filteredTags: function() {
      let tags = this.allTags.filter(element => {
        return this.beginsWith(element.text);
      });
      if (tags.length > this.tagLimit) tags.splice(this.tagLimit);
      return tags;
    },
    tempBlanks: function() {
      let regex = /\{.*?\}/g;
      let match = this.text.match(regex);
      let copy = this.blankSymbols;
      this.blankSymbols = [];
      for (var i in match) {
        match[i] = match[i].replace("{", "");
        match[i] = match[i].replace("}", "");
        this.blankSymbols.push({
          answers: [
            {
              answer: match[i],
              correct: true
            }
          ]
        });
      }
      for (var i in copy) {
        this.blankSymbols[i].answers = copy[i].answers;
      }
      return match;
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