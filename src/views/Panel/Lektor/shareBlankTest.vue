<template>
  <div class="container">
    <form @submit.prevent="sendTest()" id="ReadVideoTest" class="col-12">
      <div class="col-sm">
        <div class="col-12">
          <h1 class="col-sm">{{this.test.name}}</h1>
          <h3 class="m-5">Grupy</h3>
          <div class="m-3 row">
            <div class="col-6" v-for="(ilosc, idx) in liczba_grup" :key="idx">
              <select name="sub_type" class="m-2 form-control">
                <option v-for="(value, key) in getGroups" :value='value.id' :key='key' :selected="key === grupy[idx]">
                    {{value.name}}
                </option>
              </select>
            </div>
            <button
              type="button"
              class="m-2 btn btn-primary form-control col-1"
              title="Dodaj nową grupę"
              @click="addGroup()"
            >Dodaj</button>
              <button
                type="button"
                class="m-2 btn btn-danger form-control col-1"
                title="Usuń jedną grupę"
                @click="deleteGroup()"
              >X</button>
          </div>
          <button
            type="submit"
            class="m-5 col-10 form-control btn btn-success mt-1 mb-3"
          >Zatwierdź test</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import JQuery from "jquery";
let $ = JQuery;

export default {
  name: "shareBlank",
  data() {
    return {
      liczba_grup: 1,
      test: "",
    }
  },
  methods: {
    addGroup(){
      this.liczba_grup += 1;
    },
    deleteGroup(){
      this.liczba_grup -= 1;
    },
    readIds(){
      let answerArray = [];
      if (this.test.roles){
        for (i in this.test.roles.length){
          answerArray.push(this.test.roles[i].id);
        }
        console.log(answerArray)
      }
      $("select").each(function() {
        let selectValue = $(this).val();
        selectValue = parseInt(selectValue);
        if (selectValue > 0){
          answerArray.push(selectValue);
        }
      });
      return answerArray
    },
    sendTest() {
      let id_grup = this.readIds();
      this.$req
        .put("/api/BlankInsertTestShare/" + this.$route.params.id, id_grup)
        .then(() => {
          alert("poprawne udostępnienie testu");
          this.$store.dispatch("loadRVTests");
        })
        .catch(() => {
          alert("Wystąpił błąd");
        });
    }
  },
  mounted(){
    this.$req
      .get("/api/BlankInsertTest/" + this.$route.params.id)
      .then(response => {
        this.test = response.data.body;
        this.$store.dispatch("loadBlankTests");
      })
  },
  computed: {
    getGroups: function() {
      let grupy = this.$store.state.roles;
      let filteredOut = ["ADMIN", "LEKTOR", "USER", "UNCONFIRMED"];
      grupy = grupy.filter(function(element) {
        return !filteredOut.includes(element.name);
      });
      return grupy;
    },
    grupy: function() {
      let groups = [];
      if (this.test.roles){
        this.liczba_grup = this.test.roles.length;
        console.log(this.test.roles)
        this.test.roles.forEach((role, idx) => {
          this.getGroups.forEach((group, idx2) => {
            if (role.id === group.id){
              groups.push(idx2)
            }
          })
        })
      }
      return groups;
    }
  }
}
</script>