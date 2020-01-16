<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Lista użytkowników</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
          <thead>
            <th>email</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>nazwa użytkownika</th>
            <th>Akcja</th>
          </thead>
          <tbody>
            <tr v-for="(user,userId) in users" :key="userId">
              <td>{{user.email}}</td>
              <td>{{user.first_name}}</td>
              <td>{{user.last_name}}</td>
              <td>{{user.username}}</td>
              <td>
                <router-link :to="'/edit-user/'+(user.id)">
                  <button class="btn-primary mb-1">Edytuj</button>
                </router-link>
                <button class="btn-danger" @click="deleteUser(userId)">Usuń</button>
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
  name: "UsersManagement",
  data() {
    return {
      users: []
    };
  },
  methods: {
    deleteUser(userId) {
      if (confirm("Cy na pewno usunąć użytkownika?")) {
        this.$req
          .delete("/api/users/" + userId)
          .then(function() {
            alert("użytkownik usunięty poprawnie");
          })
          .catch(function() {
            alert("błąd usuwania użytkownika");
          });
      }
    }
  },
  mounted() {
    this.$req.get("/users").then(response => {
      this.users = response.data._embedded.users;
    });
  }
};
</script>