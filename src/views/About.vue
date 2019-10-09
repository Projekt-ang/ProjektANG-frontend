<template>
  <div class="about">
    <h1>Test api</h1>
    <button class="btn btn-danger m-1 btn-rounded" @click="apiTest()">Wyślij GET</button>
    <p v-if="response">{{response}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: undefined,
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
  }
}
</script>
