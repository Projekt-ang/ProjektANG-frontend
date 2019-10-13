<template>
  <div class="about">
    <h1>Lista testów</h1>
    <button class="btn btn-danger m-1 btn-rounded" @click="apiTest()">Wyślij GET</button>
    <div v-if="testy">
      <p v-for="(test, idx) in this.testy" :key="idx"> 
        <router-link :to="'/about/'+test.id">Test {{test.id}}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      testy: undefined,
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
        .get("http://77.55.210.216:3000/textTests")
        .then(response => {
          this.testy = response.data;
        })
  }
}
</script>
