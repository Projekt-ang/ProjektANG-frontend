<template>
  <div class="table-responsive justify-content-center">
    <button class="btn btn-success m-1" @click="modalAdd()">Dodaj test</button>
    <table class="table table-striped w-auto mx-auto">
      <thead>
        <tr>
          <td>Nazwa</td>
          <td>Autor</td>
          <td>Tagi</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(test, idx) in this.$store.state.blankTests" :key="idx">
          <td class="align-middle">{{test.name}}</td>
          <td class="align-middle">{{test.author}}</td>
          <td class="align-middle">
            <div v-if="test.tags.length === 0">Brak</div>
            <div v-for="(tag, idx) in test.tags" :key="idx">{{tag.text}}</div>
          </td>
          <td class="align-middle">
            <button class="btn btn-danger m-1 btn-rounded" @click="modalDelete(test.id)">Usuń</button>
            <button class="btn btn-primary m-1" @click="modalEdit(test.id, test)">Edytuj</button>
          </td>
        </tr>
      </tbody>
    </table>
    <BlankModal :id="idTmp"/>
    <confirmDeleteModal :id="idTmp" typ="blank"/>
  </div>
</template>

<script>
import JQuery from "jquery";
let $ = JQuery;

import BlankModal from "@/components/modals/BlankTest";
import confirmDeleteModal from "@/components/modals/ConfirmDelete";
export default {
  name: "BlankTests",
  components: {
    BlankModal,
    confirmDeleteModal
  },
  data() {
    return {
      idTmp: undefined,
    };
  },
  methods: {
    modalAdd: function() {
      this.idTmp = undefined;
      $("#blankTest").modal("toggle");
    },
    modalEdit: function(id) {
      this.idTmp = id;
      $("#blankTest").modal("toggle");
    },
    modalDelete: function(id) {
      this.idTmp = id;
      $("#confirmDelete").modal("toggle");
    }
  },
  mounted() {},
  computed: {}
};
</script>