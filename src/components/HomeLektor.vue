<template>
  <div class="vertical-center">
    <div class="container">
      <h1>Panel Lektora</h1>
      <div class="row">
        <div class="col-sm">
          <router-link :to="'panel/lektor/users'">
            <button class="btn btn-sq-lg btn-primary">
              <h2>Zarządzanie Użytkownikami</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'panel/lektor/content-management'">
            <button class="btn btn-sq-lg btn-success">
              <h2>Zarządzanie Treścią</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'panel/lektor/group-management'">
            <button class="btn btn-sq-lg btn-danger">
              <h2>Zarządzanie grupami</h2>
            </button>
          </router-link>
        </div>
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
  methods: {}
};
</script>
