<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <p v-if="content">{{this.content}}</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data(){
      return {
        content: undefined
      }
    },
  components: {
    HelloWorld
  },
  methods: {
    testApi: function() {
      axios
        .get("http://18.195.242.27:8080/test")
        .then(response => {
          this.content = response.data;
        })
    }
  }
}
</script>
