<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Edycja użytkownika</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="updateUser" class="col-12">
          <div class="row">
            <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
              <thead>
                <th>Parametr</th>
                <th>Wartość</th>
              </thead>
              <tbody>
                <tr>
                  <td>e-mail</td>
                  <td>
                    <input type="text" v-model="user.email">
                  </td>
                </tr>
                <tr>
                  <td>Imię</td>
                  <td>
                    <input type="text" v-model="user.firstName">
                  </td>
                </tr>
                <tr>
                  <td>Nazwisko</td>
                  <td>
                    <input type="text" v-model="user.lastName">
                  </td>
                </tr>
                <tr>
                  <td>Nazwa użytkownika</td>
                  <td>
                    <input type="text" v-model="user.username">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <input type="submit" class="btn-success col-12" value="Zaktualizuj użytkownika">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditUser",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    updateUser() {
      this.$req
        .put("/api/user/" + this.$route.params.id, this.user)
        .then(function() {
          alert("Zaktualizowano poprawnie");
        })
        .catch(errors => {
          console.log(errors);
          alert("Błąd aktualizacji danych użytkownika");
        });
    }
  },
  mounted() {
    this.$req.get("/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
  }
};
</script>