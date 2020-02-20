<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Wyniki</h1>
    </div>
    <div class="row">
      <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
        <thead>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Punkty</th>
          <th>Max. Punktów</th>
          <th>Wynik(%)</th>
        </thead>
        <tbody>
          <tr v-for="(test,testId) in this.wyniki" :key="testId">
            <td></td>
            <td></td>
            <td>{{test.points}}</td>
            <td>{{test.maxPoints}}</td>
            <td>{{test.percentage}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "wynikiRVT",
  data() {
    return {
      results: [],
      testNames: []
    };
  },
  methods: {},
  mounted() {},
  computed: {
    wyniki: function(){
      return this.$store.state.results;
    }
  }
};
</script>