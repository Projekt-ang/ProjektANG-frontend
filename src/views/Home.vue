<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <p v-if="content">{{this.content}}</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      content: undefined
    };
  },
  components: {
    HelloWorld
  }
};
</script>
