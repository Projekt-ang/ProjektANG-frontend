<template>
  <div class="table-responsive justify-content-center">
    <button class="btn btn-success m-4" @click="modalAdd()">Dodaj test</button>
    <table class="table table-striped w-auto mx-auto">
      <thead>
        <tr>
          <td>Nazwa</td>
          <td>Autor</td>
          <td>Tagi</td>
          <td>Grupy</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(test, idx) in this.$store.state.readingVideoTests" :key="idx">
          <td class="align-middle">{{test.name}}</td>
          <td class="align-middle">{{test.author}}</td>
          <td class="align-middle">
            <div v-if="test.tags.length === 0">Brak</div>
            <div v-for="(tag, idx) in test.tags" :key="idx">{{tag.text}}</div>
          </td>
          <td class="align-middle">
            <div v-if="test.roles.length === 0"> Brak </div>
            <div v-for="(grupa, idx2) in test.roles" :key="idx2">{{grupa.name}}</div>
          </td>
          <td class="align-middle">
            <button class="btn btn-danger m-1 btn-rounded" @click="modalDelete(test.id)">Usuń</button>
            <button class="btn btn-primary m-1" @click="modalEdit(test.id, test)">Edytuj</button>
            <button class="btn btn-success m-1" @click="modalPodglad(test.id)">Podglad</button>
            <router-link :to="'/crud/tests/reading-video/share/' + test.id">
              <button class="btn btn-info m-1">Udostępnij</button>
            </router-link>
            <router-link :to="'/crud/tests/reading-video/wyniki/' + test.id">
              <button class="btn btn-warning m-1">Wyniki</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <RVTestModal :id="idTmp"/>
    <confirmDeleteModal :id="idTmp" typ="readingvideo"/>
    <RVPodgladModal :id="idTmp"/>
  </div>
</template>

<script>
import JQuery from "jquery";
let $ = JQuery;

import RVTestModal from "@/components/modals/RVTest";
import confirmDeleteModal from "@/components/modals/ConfirmDelete";
import RVPodgladModal from "@/components/modals/RVTestPodglad";
export default {
  name: "ReadingVideoTests",
  components: {
    RVTestModal,
    confirmDeleteModal,
    RVPodgladModal
  },
  data() {
    return {
      idTmp: undefined,
      groups: this.$store.state.roles
    };
  },
  methods: {
    modalAdd: function() {
      this.idTmp = undefined;
      $("#RVTest").modal("toggle");
    },
    modalEdit: function(id) {
      this.idTmp = id;
      $("#RVTest").modal("toggle");
    },
    modalDelete: function(id) {
      this.idTmp = id;
      $("#confirmDelete").modal("toggle");
    },
    modalPodglad: function(id) {
      this.idTmp = id;
      $("#testPodglad").modal("toggle");
    }
  },
  mounted() {},
  computed: {}
};
</script>