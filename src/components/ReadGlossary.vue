<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Glosariusz</h1>
        <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
          <thead>
            <th>Słowo</th>
            <th>Definicja</th>
            <th v-if="userRole=='LEKTOR'">Akcja</th>
          </thead>
          <tbody>
            <tr v-for="(word,wordId) in words" :key="wordId">
              <td class="align-middle">{{word.word}}</td>
              <td class="align-middle">{{word.definition}}</td>
              <td class="align-middle" v-if="userRole=='LEKTOR'">
                <router-link :to="'/EditGlossary/'+word.id">
                  <button class="btn-primary mr-2">Edytuj</button>
                </router-link>
                <button class="btn-danger" @click.stop="deleteWord(wordId,word)">Usuń</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadGlossary",
  props: ["userRole"],

  data() {
    return {
      words: []
    };
  },
  methods: {
    deleteWord(wordId, word) {
      if (confirm("usunąć definicję słowa " + word.word + " ?")) {
        this.$req
          .delete("/api/glossary/" + wordId)
          .then(() => {
            alert("Definicja usunięta pomyślnie");
            this.words = this._.filter(this.words, w => {
              return w.id != wordId;
            });
          })
          .catch(errors => {
            console.log(errors);
            alert("błąd podczas usuwania definicji z glosariusza");
          });
      }
    }
  },
  mounted() {
    this.$req.get("/glossaries").then(response => {
      this.words = response.data._embedded.glossaries;
    });
  }
};
</script>