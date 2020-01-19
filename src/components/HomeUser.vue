<template>
  <div class="vertical-center">
    <div class="container">
      <h1>Panel użytkownika</h1>
      <div class="row">
        <div class="col-sm">
          <router-link :to="'/Settings'">
            <button class="btn btn-sq-lg btn-primary">
              <h2>Ustawienia</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/Tests'">
            <button class="btn btn-sq-lg btn-success">
              <h2>Testy</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/Results'">
            <button class="btn btn-sq-lg btn-danger">
              <h2>Wyniki</h2>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>