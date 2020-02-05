<template>
  <div class="blankTest container">
    <div class="row" v-if="checked">
      <h1 class="col-12">Test ukończony</h1>
      <h2 class="col-12">Twój wynik to: {{points + " / "+ maxPoints }}</h2>
    </div>
    <div class="row">
      <div class="col-12">
        <button type="button" class="btn-primary mt-3" @click="showModal">Glosariusz dla tego testu</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3" v-if="glossaryStatus">
        <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
          <thead>
            <th>Słowo</th>
            <th>Definicja</th>
            <th>Przykłady</th>
          </thead>
          <tbody>
            <tr v-for="(word,wordId) in filteredGlossary" :key="wordId">
              <td>{{word.word}}</td>
              <td>{{word.definition}}</td>
              <td v-html="showSentences[wordId]"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="test" class="row">
      <h2 class="col-12">Przeczytaj tekst i w lukach wybierz odpowiednie odpowiedzi</h2>
      <div class="m-5">
        <div class="row d-flex justify-content-center">
          <div class="col-12" v-html="processedHtml"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <button
        type="submit"
        class="form-control btn-success col-12 mt-3"
        @click="calculatePoints"
      >Zatwierdź</button>
    </div>
  </div>
</template>
 
<script>
import JQuery from "jquery";
let $ = JQuery;

export default {
  name: "BlankTest",
  data() {
    return {
      test: undefined,
      checked: false,
      points: 0,
      maxPoints: 0,
      answers: [],
      glossary: [],
      glossaryStatus: false,
      foundWords: []
    };
  },
  methods: {
    calculatePoints() {
      if (this.checked) {
        alert("Nie można zmieniać odpowiedzi po wypełnieniu testu");
        return false;
      }
      this.points = 0;
      this.maxPoints = this.test.blankSymbols.length;
      let answerArray = [];
      $("select").each(function() {
        let selectValue = $(this).val();
        answerArray.push(selectValue);
      });

      for (var i in answerArray) {
        if (answerArray[i] == this.test.blankSymbols[i].answers[0].answer) {
          this.points++;
        }
      }

      this.checked = true;
      this.answers = answerArray;

      this.colorAnswers();
      this.sendTest();
    },

    colorAnswers() {
      let answers = this.answers;
      let blanks = this.test.blankSymbols;
      let i = 0;
      $("select").each(function() {
        if (answers[i] == blanks[i].answers[0].answer) {
          $(this).css("background-color", "lawngreen");
        } else {
          $(this).css("background-color", "red");
        }
        i++;
      });
    },

    sendTest() {
      let testJson = {};
      testJson.userId = this.user.id;
      testJson.testId = parseInt(this.$route.params.id);
      testJson.answerIds = [];
      for (var i in this.answers) {
        testJson.answerIds.push(parseInt(this.findAnswer(this.answers[i])));
      }
      console.log(testJson);
      this.$req
        .post("/api/check-answers", testJson)
        .then(function() {
          alert("wynik zapisany poprawnie");
        })
        .catch(function() {
          alert("błąd wysyłania wyników testu");
        });
    },

    setGlossary() {
      for (var i in this.glossary) {
        let preparedString =
          "<span class='glossarySpan' id='" +
          this.glossary[i].id +
          "' @click='showModal'>";
        preparedString += this.glossary[i].word + "</span>";

        if (
          this.test.text.includes(this.glossary[i].word) &&
          !this.foundWords.includes(this.glossary[i].word)
        ) {
          this.foundWords.push(this.glossary[i].word);
        }

        this.test.text = this.test.text.replace(
          this.glossary[i].word,
          preparedString
        );
      }
    },
    showModal() {
      this.glossaryStatus = !this.glossaryStatus;
    },

    findAnswer(answer) {
      for (var i in this.test.blankSymbols) {
        for (var j in this.test.blankSymbols[i].answers) {
          if (this.test.blankSymbols[i].answers[j].answer == answer) {
            return this.test.blankSymbols[i].answers[j].id;
          }
        }
      }
    }
  },

  mounted() {
    this.$req
      .get("/api/BlankInsertTest/" + this.$route.params.id)
      .then(response => {
        this.test = response.data.body;
        this.glossary = this.$store.getters.glossary;
        console.log(this.glossary);
      });
  },

  computed: {
    processedHtml() {
      let regex = /\{.*?\}/g;
      let match = this.test.text.match(regex);
      this.setGlossary();
      let converted = this.test.text;

      var odp = [];
      for (var k in this.test.blankSymbols) {
        odp[k] = [];
        for (var l in this.test.blankSymbols[k].answers) {
          odp[k][l] = this.test.blankSymbols[k].answers[l].answer;
        }
      }
      //odpowiedzi w losowej kolejnosci
      for (var d in odp) {
        odp[d] = _.shuffle(odp[d]);
      }
      var select = [];

      for (var m in odp) {
        select[m] = "";
        select[m] += "<select required class='answerSelect'>";
        select[m] += "<option> </option>";
        for (var n in odp[m]) {
          select[m] += "<option>" + odp[m][n] + "</option>";
        }
        select[m] += "</select>";
      }

      for (var i in match) {
        converted = converted.replace(match[i], select[i]);
      }
      console.log(converted);

      return converted;
    },
    user: function() {
      return this.$store.getters.getUser;
    },
    showSentences: function() {
      let sentences = [];
      let combined = "";
      for (var i in this.glossary) {
        combined = "";
        for (var j in this.glossary[i].usageExamples) {
          combined += this.glossary[i].usageExamples[j].sentence + "<br/><br/>";
        }
        sentences.push(combined);
      }

      return sentences;
    },
    filteredGlossary: function() {
      let filtered = [];
      for (var i in this.glossary) {
        for (var j in this.foundWords) {
          if (this.glossary[i].word == this.foundWords[j]) {
            filtered.push(this.glossary[i]);
          }
        }
      }
      console.log(filtered);
      return filtered;
    }
  }
};
</script>
 
<style>
li {
  list-style-type: none;
}

.glossarySpan {
  font-weight: 900;
  cursor: pointer;
  color: red;
}
</style>