<template>
  <div class="containter">
    <div class="row">
      <h1 class="col-12 mb-5">Zarządzanie grupą: {{group.name}}</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <button type="button" @click="saveGroup" class="btn btn-success mb-5 col-12">Zapisz grupę</button>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
          <thead>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Akcja</th>
          </thead>
          <tbody>
            <tr v-for="(user,userId) in users" :key="userId">
              <td>{{user.firstName}}</td>
              <td>{{user.lastName}}</td>
              <td>
                <button type="button" @click="addToGroup(user)" class="btn-primary">Dodaj do grupy</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-2"/>
      <div class="col-5">
        <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
          <thead>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Akcja</th>
          </thead>
          <tbody>
            <tr v-for="(user,userId) in groupUsers" :key="userId">
              <td>{{user.firstName}}</td>
              <td>{{user.lastName}}</td>
              <td>
                <button
                  type="button"
                  class="btn-primary"
                  @click="removeFromGroup(user)"
                >Usuń z grupy</button>
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
  name: "Group",
  data() {
    return {
      group: {},
      users: [],
      groupUsers: []
    };
  },
  methods: {
    addToGroup(addedUser) {
      console.log(addedUser);
      for (var i in this.groupUsers) {
        if (this.groupUsers[i].username == addedUser.username) {
          return 0;
        }
      }
      this.groupUsers.push(addedUser);
    },
    removeFromGroup(removedUser) {
      for (var i in this.groupUsers) {
        if (this.groupUsers[i].username == removedUser.username) {
          this.groupUsers.splice(i, 1);
        }
      }
    },

    saveGroup() {}
  },
  mounted() {
    this.$req.get("/roles/" + this.$route.params.id).then(response => {
      this.group = response.data;
    });

    this.$req.get("/users").then(response => {
      this.users = response.data._embedded.users;
    });
  }
};
</script>