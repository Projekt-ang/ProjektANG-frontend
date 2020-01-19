<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Tworzenie nowego konta użytkownika</h1>
    </div>
    <div class="row">
      <table table class="table table-striped table-hover table-bordered w-50 mx-auto">
        <thead>
          <th>Parametr</th>
          <th>Dane</th>
        </thead>
        <tbody>
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
            <td>email</td>
            <td>
              <input type="text" v-model="user.email">
            </td>
          </tr>
          <tr>
            <td>username</td>
            <td>
              <input type="text" v-model="user.username">
            </td>
          </tr>
          <tr>
            <td>Hasło</td>
            <td>
              <input type="password" v-model="user.password">
            </td>
          </tr>
          <tr>
            <td>rola</td>
            <td>
              <select v-model="chosenRole">
                <option value="ROLE_LEKTOR" v-if="currentUser.roles.indexOf('ROLE_ADMIN')>=0">Lektor</option>
                <option value="ROLE_USER">Użytkownik</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <button
        type="submit"
        class="col-12 form-control btn btn-success mt-1 mb-3"
        @click="register"
      >Zarejestruj konto</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        roles: []
      },
      chosenRole: ""
    };
  },
  methods: {
    register() {
      this.user.roles.push(this.chosenRole);
      console.log(this.user);
      this.$req
        .post("/api/register", this.user)
        .then(function() {
          alert("rejestracja zakończona pomyślnie");
        })
        .catch(function() {
          alert("błąd podczas rejestracji");
        });
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
