<template>
  <div class="about">
    <h1>Lista testów</h1>
    <div v-if="test">  
      <h2>Przeczytaj tekst i odpowiedz na pytania</h2>
      <p>{{this.test.text}}</p>
      <h3>Pytania</h3>
        <div v-for="(question, idx) in this.test.questions" :key="idx">
          <h4>{{question.question}}</h4>
          <ul>
              <li v-for="(answer, idx2) in question.answers" :key="idx2"><input type="radio" :name="'odp'+idx">{{answer.answer}}</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
//takie na szybko demko bez rozbijania tego na mniejsze komponenty
import axios from "axios";
export default {
  name: 'texttest',
  data() {
  return {
    test: undefined,
  };
  },
  methods: {
  apiTest: function() {
    this.$req
    .get("/test")
    .then(response => {
      this.response = response.data;
    })
  }
  },
  mounted() {
  axios
    .get("http://77.55.210.216:3000/textTests/"+this.$route.params.id)
    .then(response => {
      this.test = response.data;
    })
  }
}
</script>

<style>
li {
    list-style-type: none
}
</style>
