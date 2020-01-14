<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Wyniki</h1>
    </div>
    <div class="row">
      <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
        <thead>
          <th>Test</th>
          <th>Wynik</th>
        </thead>
        <tbody>
          <tr></tr>
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
      results: []
    };
  },
  methods: {
    filterTests() {}
  },
  mounted() {
    this.$req.get("/api/get-user-results/").then(response => {
      this.results = response.data._embedded;
      this.filterTests();
    });
  }
};
</script>