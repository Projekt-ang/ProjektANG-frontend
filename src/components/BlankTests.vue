<template>
    <div class="table-responsive justify-content-center">
            <button class="btn btn-success m-1" @click="modalAdd()">Dodaj test</button>
      <table class="table table-striped w-auto mx-auto">
        <thead>
          <tr>
            <td>Nazwa</td>
            <td>Autor</td>
            <td>Lista Grup</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(test, idx) in this.testy" :key="idx">
            <td class="align-middle">{{test.name}}</td>
            <td class="align-middle">{{test.author}}</td>
            <td class="align-middle">1 2 3</td>
            <td class="align-middle">
              <button class="btn btn-danger m-1 btn-rounded" @click="modalDelete(test.id)">Usuń</button>
              <button class="btn btn-primary m-1" @click="modalEdit(test.id, test)">Edytuj</button>
            </td>
          </tr>
        </tbody>
      </table>
    <BlankModal :id="idTmp"/>
    </div>
</template>

<script>
import JQuery from 'jquery'
let $ = JQuery;

import BlankModal from "@/components/modals/BlankTest";
export default {
  name: "BlankTests",
  components: {
    BlankModal
  },
  data() {
    return {
      testy: undefined,
      idTmp: undefined,
      testTmp: undefined
    };
  },
  methods: {
    modalAdd: function() {
        this.idTmp = undefined;
        //this.testTmp = undefined;
        $("#blankTest").modal("toggle");
    },
    modalEdit: function(id, blankTest) {
      this.idTmp = id;
      this.testTmp = blankTest;
      $("#blankTest").modal("toggle");
    },
  },
  mounted() {
    this.$req.get("/blankInsertTests").then(response => {
      this.testy = response.data._embedded.blankInsertTests;
    });
  }
};

</script>