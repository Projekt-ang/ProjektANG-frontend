<template>
  <div class="about">
    <h1>Lista testów</h1>
    <router-link :to="'/CreateReadingVideoTest'">
      <button class="btn btn-success btn-lg m-4" v-if="role == 'LEKTOR'">
        Dodaj test
      </button>
    </router-link>
    <table
      table
      class="table table-striped table-hover table-bordered w-75 mx-auto"
    >
      <thead>
        <th>Nazwa</th>
        <th>Autor</th>
        <th>Rodzaj testu</th>
        <th>Grupy</th>
        <th style="width: 15%" v-if="role == 'LEKTOR'"></th>
      </thead>
      <tbody>
        <template v-for="(test, idx) in this.testy">
          <tr @click="expand(test.id)" :key="idx">   
            <td class="align-middle">
              <div v-if="test.questions">
                <router-link :to="'/about/' + test.id">
                  <p v-if="!test.name">Brak nazwy</p>
                  {{ test.name }}
                </router-link>
              </div>
              <div v-if="test.blankSymbols">
                <router-link :to="'/BlankTest/' + test.id">
                  <p v-if="!test.name">Brak nazwy</p>
                  {{ test.name }}
                </router-link>
              </div>
            </td>  
            <td class="align-middle">
              <p v-if="!test.author"></p>
              {{ test.author }}
            </td>
            <td class="align-middle">Reading</td>
            <td class="align-middle">10</td>
            <td class="align-middle" v-if="role == 'LEKTOR'">
              <div v-if="test.questions">
                <button class="btn-danger" @click.stop="deleteTestReading(test.id)">
                  Usuń
                </button>
                <router-link :to="'/about/editReadingVideoTest/' + test.id">
                  <button class="btn-primary">Edytuj</button>
                </router-link>
              </div>
              <div v-if="test.blankSymbols">
                <button class="btn-danger" @click.stop="deleteTestBlank(test.id)">
                  Usuń
                </button>
                <router-link :to="'/about/editBlankTest/' + test.id">
                  <button class="btn-primary">Edytuj</button>
                </router-link>
              </div>
            </td>
          </tr>
          <tr v-if="test.id in expanded" :key="idx">
            <td colspan="100%">
              <div v-if="test.questions">
                <div class="accordian-body">
                  <div class="row justify-content-md-center">
                    <div class="col-11">
                      <h3 class="m-2">Tekst</h3>
                      <div v-html="test.text"></div>

                      <div class="m-2">
                        <div class="row justify-content-md-center">
                          <div
                            class="col-6"
                            v-for="(question, questionIdx) in test.questions"
                            :key="questionIdx"
                          >
                            <h4 class="m-3">Pytanie {{ questionIdx + 1 }}</h4>
                            <p class="m-1 font-weight-bolder">
                              {{ question.question }}
                            </p>
                            <div
                              class="row justify-content-md-center"
                              v-for="(answer, answerIdx) in question.answers"
                              :key="answerIdx"
                            >
                              <div class="col-8">
                                <p class="m-1 text-justify">
                                  {{ answer.answer }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <div v-if="test.blankSymbols">
                <div class="accordian-body">
                  <div class="row justify-content-md-center">
                    <div class="col-11">
                      <h3 class="m-2">Tekst</h3>
                      <div
                        v-html="processedHtml(test)">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testy: undefined,
      blanks: undefined,
      expanded: {}
    };
  },
  methods: {
    apiTest: function() {
      this.$req.get("/test").then(response => {
        this.response = response.data;
      });
    },
    expand(id) {
      if (id in this.expanded) this.$delete(this.expanded, id);
      else this.$set(this.expanded, id, true);
    },
    processedHtml (wyswietlanyTekst) {
      let regex = /\{.*?\}/g;
      let match = wyswietlanyTekst.text.match(regex);
      let converted = wyswietlanyTekst.text;

      var odp = [];
      for (var k in wyswietlanyTekst.blankSymbols){
        odp[k] = [];
        for (var l in wyswietlanyTekst.blankSymbols[k].answers){
          odp[k][l] = (wyswietlanyTekst.blankSymbols[k].answers[l].answer);
        }
      }
      
      for (var d in odp) {
        odp[d] = _.shuffle(odp[d]);
      }

      var select = [];
      for (var m in odp) {
        select[m] = "";
        select[m] += "<select>";
        select[m] += "<option> </option>";
        for (var n in odp[m]){
          select[m] += "<option>" + odp[m][n] + "</option>";
        }
        select[m] += "</select>";
      }
      for (var i in match) {
        converted = converted.replace(match[i], select[i]);
      }
      return converted;
    },
    deleteTestReading(id) {
      if (confirm("Czy napewno chcesz usunac test " + id)) {
        this.$req
          .delete("/api/readingVideoTest/" + id)
          .then(() => {
            alert("Test usunięto poprawnie");
            this.testy = this._.filter(this.testy, t => {
              return t.id != id;
            });
          })
          .catch(error => {
            this.testy = this._.filter(this.testy, t => {
              return t.id != id;
            });
            console.log(error);
            alert(
              "Wystąpił błąd podczas usuwania testu. Proszę spróbować ponownie"
            );
          });
      }
    },
    deleteTestBlank(id) {
      if (confirm("Czy napewno chcesz usunac test " + id)) {
        this.$req
          .delete("/api/BlankInsertTest/" + id)
          .then(() => {
            alert("Test usunięto poprawnie");
            this.testy = this._.filter(this.testy, t => {
              return t.id != id;
            });
          })
          .catch(error => {
            this.testy = this._.filter(this.testy, t => {
              return t.id != id;
            });
            console.log(error);
            alert(
              "Wystąpił błąd podczas usuwania testu. Proszę spróbować ponownie"
            );
          });
      }
    }
  },
  mounted() {
    this.$req.get("/readingVideoTests").then(response => {
      this.testy = response.data._embedded.readingVideoTests;
    });

    this.$req.get("/blankInsertTests").then(response => {
      this.blanks = response.data._embedded.blankInsertTests;

    }).finally(() => {
      this.blanks.forEach(test => {
        if (test){
          this.testy.push(test);
        }
      });
    });
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    role: function() {
      return this.$store.getters.getRole;
    }
  }
};
</script>
