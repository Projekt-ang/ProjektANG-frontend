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
  name: "EditGlossaryDefinition",
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
      this.$req
        .put("/api/glossary/" + this.$route.params.id, newWord)
        .then(function() {
          alert("Zaktualizowano poprawnie");
        })
        .catch(errors => {
          console.log(errors);
          alert("Błąd aktualizacji wpisu w glosariuszu");
        });
    }
  },

  mounted() {
    this.$req
      .get("/glossaries/" + this.$route.params.id)
      .then(response => {
        this.word = response.data.word;
        this.definition = response.data.definition;
        this.usageExamples = response.data.usageExamples;
      })
      .catch(errors => {
        console.log(errors);
      });
  }
};
</script>