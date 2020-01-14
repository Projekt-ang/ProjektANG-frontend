<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Ustawienia</h1>
    </div>
    <div class="row">
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {};
  },
  mounted() {},
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    role: function() {
      return this.$store.getters.getRole;
    }
  }
};
</script>