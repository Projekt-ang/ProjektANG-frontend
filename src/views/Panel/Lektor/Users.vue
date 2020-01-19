<template>
  <div class="vertical-center">
    <div class="container">
      <h1>Zarządzanie Użytkownikami</h1>
      <div class="row">
        <div class="col-sm">
          <router-link :to="'/mass-register'">
            <button class="btn btn-sq-lg btn-primary">
              <h2>Rejestracja masowa</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/register'">
            <button class="btn btn-sq-lg btn-primary">
              <h2>Rejestracja pojedynczego konta</h2>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Users",
  data() {
    return {};
  },
  computed: {
    user() {
      console.log(this.$store.getters.user);
      return this.$store.getters.getUser;
    }
  }
};
</script>