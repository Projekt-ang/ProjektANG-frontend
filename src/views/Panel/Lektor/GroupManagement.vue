<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Zarządzanie grupami</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <input type="text" v-model="newGroup" placeholder="Podaj nazwę nowej grupy">
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <button type="button" @click="createGroup" class="btn btn-success mt-3 mb-5">Dodaj grupę</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
          <thead>
            <th>Nazwa grupy</th>
            <th>Akcja</th>
          </thead>
          <tbody>
            <tr v-for="(group,groupId) in groups" :key="groupId">
              <td class="align-middle">{{group.name}}</td>
              <td class="align-middle">
                <router-link :to="'/panel/lektor/group/'+group.id">
                  <button type="button" class="btn-primary">Zarządzaj</button>
                </router-link>
                <button type="button" @click="deleteGroup(group.id)" class="btn-danger">Usuń</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "GroupManagement",
  data() {
    return {
      groups: [],
      newGroup: ""
    };
  },
  methods: {
    createGroup() {
      let createdJSON = {
        name: this.newGroup
      };

      this.$req
        .post("/api/roles", createdJSON)
        .then(function() {
          alert("Poprawne dodanie grupy");
        })
        .catch(function() {
          alert("błąd dodawnia grupy");
        });
    },

    deleteGroup(groupId) {
      this.$req
        .delete("/api/roles", groupId)
        .then(function() {
          alert("Usunięto poprawnie");
        })
        .catch(function() {
          alert("Błąd podczas usuwania grupy");
        });
    }
  },
  mounted() {
    let filteredOut = ["ADMIN", "LEKTOR", "USER", "UNCONFIRMED"];
    this.$req.get("/roles").then(response => {
      this.groups = response.data._embedded.roles;
      /*this.groups = this.groups.filter(function(element) {
        return !filteredOut.includes(element.name);
      });*/
    });
  }
};
</script>