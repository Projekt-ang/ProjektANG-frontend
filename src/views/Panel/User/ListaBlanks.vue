<template>
  <div class="table-responsive justify-content-center">
    <h1 class="m-2">Lista testów z lukami</h1>
    <table class="m-5 table table-striped table-hover table-bordered w-auto mx-auto">
      <thead>
        <tr>
          <td>Nazwa</td>
          <td>Autor</td>
          <td>Tagi</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(test, idx) in this.doRozwiazania" :key="idx">
          <td class="align-middle">
            <router-link :to="'/blank-test/'+test.id">
              {{test.name}}
            </router-link>
          </td>
          <td class="align-middle">{{test.author}}</td>
          <td class="align-middle">
            <div v-if="test.tags.length === 0">Brak</div>
            <div v-for="(tag, idx) in test.tags" :key="idx">{{tag.text}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ListaBlanks",

  data() {
    return {
      idTmp: undefined,
      results: undefined
    };
  },
  methods: {},
  mounted() {
    this.$req
      .get("/api/get-user-results/" + this.user.id)
      .then( response => {
        this.results = response.data
      });
  },
  computed: {
    user: function() {
      return this.$store.getters.getUser;
    },
    doRozwiazania: function() {
      let lista_testow  = [];
      let wszystkie_testy = this.$store.state.blankTests;

      wszystkie_testy.forEach((test, idx) => {
        if (this.results){
          //czy test bedzie widoczny dla uzytkownika
          let test_flag = true;
          this.results.forEach((result, idx) => {
            if (result.blankInsertTest){
              if (test.id === result.blankInsertTest.id){
                //jak jest w wynikach to nie jest widoczny
                test_flag = false;
              }
            }
          })
          if (test_flag){
            lista_testow.push(test);
          }
        }
      })
      return lista_testow;
    }
  }
};
</script>