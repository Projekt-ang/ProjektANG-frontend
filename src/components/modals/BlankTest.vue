<template>
  <div id="blankTest" class="modal fade" role="dialog">
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
                <h1>Test z lukami</h1>
                <form @submit.prevent="zapisz()" id="BlankTest" class="col-12">
                  <div class="row">
                    <div class="col-1"/>
                    <input
                      type="text"
                      class="col-5 form-control m-2"
                      v-model="blankTmp.name"
                      placeholder="Tytuł"
                      required
                    >
                    <input
                      type="text"
                      class="col-5 form-control m-2"
                      v-model="blankTmp.author"
                      placeholder="Autor"
                      required
                    >
                    <div class="col-1"/>
                  </div>

                  <div class="row">
                    <input
                      type="text"
                      v-model="blankTmp.inputTag"
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

                  <vue-editor v-model="blankTmp.text" required/>
                  <div class="row">
                    <div class="col-6" v-for="(blank,blankId) in tempBlanks" :key="blankId">
                      <div>Luka {{ blank }}</div>
                      <div class="row">
                        <div
                          class="col-12 mt-2"
                          v-for="(answer,answerId) in blankTmp.blankSymbols[blankId].answers"
                          :key="answerId"
                        >
                          <input
                            type="text"
                            class="col-9 mr-2"
                            v-if="answerId>0"
                            v-model="answer.answer"
                          >
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
                  <button
                    type="submit"
                    class="col-12 form-control btn btn-success mt-1 mb-3"
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
  name: "InsertBlanks",
  props: {
    id: {
      required: false
    }
  },
  data() {
    return {
      t: {
        name: "",
        author: "",
        text: "",
        tags: [],
        blankSymbols: [],
        inputTag: "",
        tagLimit: 25
      },
      allTags: [],
      allTagsTmp: []
    };
  },
  methods: {
    addAnswer(blankId) {
      this.blankTmp.blankSymbols[blankId].answers.push({
        answer: "",
        correct: false
      });
    },

    beginsWith(tagName) {
      return tagName.startsWith(this.blankTmp.inputTag);
    },

    newTag() {
      if (this.blankTmp.inputTag == "") return false;

      this.blankTmp.tags.push({
        text: this.blankTmp.inputTag
      });
      this.allTagsTmp.push({
        text: this.blankTmp.inputTag
      });

      this.allTagsTmp.sort(function(a, b) {
        return a.text > b.text;
      });
    },

    isChecked(tagName) {
      if (this.blankTmp.tags.find(element => element.text === tagName))
        return true;
      return false;
    },

    prepareJson() {
      let blankTest = {
        name: this.blankTmp.name,
        author: this.blankTmp.author,
        text: this.blankTmp.text,
        blankSymbols: this.blankTmp.blankSymbols,
        tags: this.blankTmp.tags
      };
      let regex = /\{.*?\}/g;
      let match = this.blankTmp.text.match(regex);
      for (var i in match) {
        //blankTest.text = blankTest.text.replace(match[i], "{" + i + "}");
      }

      return blankTest;
    },

    SendTest() {
      let fullTest = this.prepareJson();

      this.$req
        .post("/api/BlankInsertTest", fullTest)
        .then(() => {
          alert("poprawne wysłanie testu");
          this.$store.dispatch("loadBlankTests");
        })
        .catch(() => {
          alert("Wystąpił błąd");
        });
    },
    EditTest() {
      let fullTest = this.prepareJson();

      this.$req
        .put("/api/BlankInsertTest/" + this.id, fullTest)
        .then(() => {
          alert("poprawna edycja testu");
          this.$store.dispatch("loadBlankTests");
        })
        .catch(() => {
          alert("Wystąpił błąd");
        });
    },

    removeAnswer(blankId, answerId) {
      this.blankTmp.blankSymbols[blankId].answers.splice(answerId, 1);
    },

    toggleTag(tagName) {
      for (var i in this.blankTmp.tags) {
        if (this.blankTmp.tags[i].text == tagName) {
          this.blankTmp.tags.splice(i, 1);
          return true;
        }
      }
      this.blankTmp.tags.push({
        text: tagName
      });
    },

    zapisz: function() {
      $("#blankTest").modal("toggle");
      if (this.id) {
        this.EditTest();
      } else {
        this.SendTest();
      }
    }
  },
  mounted() {
    if (this.id) this.blankTmp = this.$store.getters.getBlankById(this.id);
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

      if (tags.length > this.blankTmp.tagLimit)
        tags.splice(this.blankTmp.tagLimit);

      return tags;
    },

    tempBlanks: function() {
      let regex = /\{.*?\}/g;
      let match = this.blankTmp.text.match(regex);
      let copy = this.blankTmp.blankSymbols;
      this.blankTmp.blankSymbols = [];
      for (var i in match) {
        match[i] = match[i].replace("{", "");
        match[i] = match[i].replace("}", "");

        this.blankTmp.blankSymbols.push({
          answers: [
            {
              answer: match[i],
              correct: true
            }
          ]
        });
      }

      for (var i in copy) {
        this.blankTmp.blankSymbols[i].answers = copy[i].answers;
      }
      return match;
    },

    blankTmp: {
      get: function() {
        if (this.id) {
          return this.$store.getters.getBlankById(this.id);
        } else return this.t;
      },
      set: function() {}
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