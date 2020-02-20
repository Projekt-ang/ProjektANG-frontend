<template>
  <div class="vertical-center">
    <div class="container">
      <h1 class="m-4">Ustawienia</h1>
      <div class="row">
        <div class="col-sm">
          <router-link :to="'/edit-password'">
            <button class="btn btn-sq-lg btn-info">
              <h2>Zmiana Hasła</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/edit-mail'">
            <button class="btn btn-sq-lg btn-success">
              <h2>Zmiana Maila</h2>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>