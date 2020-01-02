<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <router-link :to="'Panel/Lektor/Users'">
          <button type="button" class="btn-primary col-12">Zarządzanie użytkownikami</button>
        </router-link>
        <router-link :to="'Panel/Lektor/ContentManagement'">
          <button type="button" class="btn-primary col-12 mt-5">Zarządzanie treścią</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLektor",
  data() {
    return {};
  },
  methods: {},
  mounted: {}
};
</script>
