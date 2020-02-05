<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Wyniki</h1>
    </div>
    <div class="row">
      <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
        <thead>
          <th>Test</th>
          <th>Punkty</th>
          <th>Max. Punktów</th>
          <th>Wynik(%)</th>
        </thead>
        <tbody>
          <tr v-for="(test,testId) in results" :key="testId">
            <td>{{testNames[testId]}}</td>
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
  name: "Results",
  data() {
    return {
      results: [],
      testNames: []
    };
  },
  methods: {},
  mounted() {
    this.$req.get("/api/get-user-results/" + this.user.id).then(response => {
      this.results = response.data._embedded;
      console.log(this.results);

      for (var i in this.results) {
        if (this.results[i].blankInsertTest != null) {
          this.testNames.push(this.results[i].blankInsertTest.name);
        }
        if (this.results[i].readingVideoTest != null) {
          this.testNames.push(this.results[i].readingVideoTest.name);
        }
      }
    });
  },
  computed: {
    user: function() {
      return this.$store.getters.getUser;
    }
  }
};
</script>