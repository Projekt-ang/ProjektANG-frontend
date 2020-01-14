<template>
  <div class="vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <router-link :to="'/Settings'">
            <button class="btn btn-sq-lg btn-primary">
              <h2>Ustawienia</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/Testy'">
            <button class="btn btn-sq-lg btn-success">
              <h2>Testy</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/'">
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

<style>
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