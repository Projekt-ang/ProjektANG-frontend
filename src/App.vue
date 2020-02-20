<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    navbar
  },
  mounted(){
    this.$store.dispatch("loadBlankTests");
    this.$store.dispatch("loadTags");
    this.$store.dispatch("loadRVTests");
    this.$store.dispatch("loadGlossary");
    this.$store.dispatch("loadRoles");
    this.$store.dispatch("loadResults");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.table-responsive{
  font-size: 20px;
}
.btn-sq-lg {
  width: 250px !important;
  height: 250px !important;
}
.vertical-center {
  min-height: 80%; /* Fallback for browsers do NOT support vh unit */
  min-height: 70vh; /* These two lines are counted as one      */

  display: flex;
  align-items: center;
}
</style>
