<template>
  <div class="container">
    <div class="col-12">
      <div class="row">
        <h1 class="m-2 col-12">Wyniki</h1>
      </div>
      <div class="col-12">
        <div class="m-5 col-12">
          <h2>Grupa:</h2>
          <div class="col-sm">
            <div align="center">
              <select name="sub_type" v-model="selected_value" class="m-1 vertical-align form-control">
                <option v-for="(value, key) in getGroups" :value='value.id' :key='key'>
                  {{value.name}}
                </option>
              </select>
            </div>
          </div>
        </div>
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
            <tr v-for="(test,testId) in wyniki" :key="testId">
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
  </div>
</template>

<script>
import JQuery from "jquery";
let $ = JQuery;
export default {
  name: "wynikiBlanks",
  data() {
    return {
      results: [],
      testNames: [],
      selected_value: 0
    };
  },
  methods: {},
  mounted() {},
  computed: {
    wyniki: function() {
      let results = 
      this.$req
      .get("/api/get-role-results", {params: {"roleId": this.selected_value, "blankInsertTestId": this.$route.params.id}})
      .then(response => {
        this.test = response.data.body;
        this.$store.dispatch("loadBlankTests");
      })
      return results;
    },
    getGroups: function() {
      let grupy = this.$store.state.roles;
      let filteredOut = ["ADMIN", "LEKTOR", "USER", "UNCONFIRMED"];
      grupy = grupy.filter(function(element) {
        return !filteredOut.includes(element.name);
      });
      return grupy;
    }
  }
};
</script>