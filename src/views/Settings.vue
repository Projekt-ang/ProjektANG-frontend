<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Ustawienia</h1>
    </div>
    <div class="row">
      <div class="col-12" v-if="isLoggedIn">
        <router-link :to="'/EditPassword'">
          <button class="btn-primary col-12 mt-3">zmień hasło</button>
        </router-link>

        <router-link :to="'/EditMail'">
          <button class="btn-primary col-12 mt-3">zmień e-mail</button>
        </router-link>
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