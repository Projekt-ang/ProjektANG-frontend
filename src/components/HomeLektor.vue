<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <router-link :to="'panel/lektor/users'">
          <button type="button" class="btn-primary col-12">Zarządzanie użytkownikami</button>
        </router-link>
        <router-link :to="'panel/lektor/content-management'">
          <button type="button" class="btn-primary col-12 mt-5">Zarządzanie treścią</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeAdmin",
  data() {
    return {};
  },
  methods: {},
  mounted: {}
};
</script>
