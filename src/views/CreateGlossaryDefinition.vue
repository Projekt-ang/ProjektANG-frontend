<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Dodaj nową definicję do glosariusza</h1>
        <form @submit.prevent="sendTest" class="col-12">
          <div class="row">
            <input
              type="text"
              class="col-6 form-control"
              @blur="checkWord"
              v-model="word"
              id="word"
              placeholder="słowo"
            >
            <input
              type="text"
              class="col-6 form-control"
              v-model="definition"
              placeholder="definicja"
            >
          </div>
          <div class="row">
            <div class="col-12" v-for="(example,exampleId) in usageExamples" :key="exampleId">
              <input type="text" class="mt-2 col-12" v-model="usageExamples[exampleId].sentence">
            </div>
          </div>
          <div class="row">
            <button
              type="button"
              class="col-12 btn-primary mt-3"
              @click="newExample"
            >Nowy przykład użycia</button>
          </div>
          <div class="row">
            <button type="submit" class="form-control btn-success col-12 mt-3">Zatwierdź</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateGlossaryDefinition",
  data() {
    return {
      word: "",
      definition: "",
      usageExamples: []
    };
  },
  methods: {
    newExample() {
      this.usageExamples.push({
        sentence: ""
      });
    },
    checkWord() {
      this.$req
        .get(`glossaries/search/findByWord?word=${this.word}`)
        .then(
          (document.getElementById("word").style["background-color"] = "red")
        )
        .catch(
          (document.getElementById("word").style["background-color"] = "green")
        );
    },

    prepareJSON() {
      let newWord = {
        word: this.word,
        definition: this.definition,
        usageExamples: this.usageExamples
      };

      return newWord;
    },

    sendTest() {
      let newWord = this.prepareJSON();
      console.log(newWord);

      this.$req
        .post("/api/glossary", newWord)
        .then(function() {
          alert("wysłano poprawnie");
        })
        .catch(function(error) {
          alert("Wystąpił błąd");
          console.log(error);
        });
    }
  }
};
</script>