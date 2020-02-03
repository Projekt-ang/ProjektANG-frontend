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
            <tr v-for="(user,userId) in notInGroup" :key="userId">
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
            <tr v-for="(user,userId) in roleUsers" :key="userId">
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
    addToGroup(addedUser) {},
    removeFromGroup(removedUser) {},

    saveGroup() {}
  },
  mounted() {
    this.$req.get("/roles/" + this.$route.params.id).then(response => {
      this.group = response.data;
    });

    this.$req.get("/users").then(response => {
      this.users = response.data._embedded.users;
      console.log(this.users);
    });
  },
  computed: {
    roleUsers: function() {
      let list = [];
      for (var i in this.users) {
        for (var j in this.users[i].roles) {
          if (this.users[i].roles[j].name == this.group.name) {
            list.push(this.users[i]);
          }
        }
      }
      return list;
    },

    notInGroup: function() {
      let list = [];
      for (var i in this.users) {
        for (var j in this.users[i].roles) {
          if (this.users[i].roles[j].name == this.group.name) {
          } else list.push(this.users[i]);
        }
      }
      return list;
    }
  }
};
</script>