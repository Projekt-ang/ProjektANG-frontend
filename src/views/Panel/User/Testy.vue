<template>
  <div class="vertical-center">
    <div class="container">
      <h1 class="m-4">Wybierz typ testu</h1>
      <div class="row">
        <div class="col-sm">
          <router-link :to="'/tests/reading-video-tests'">
            <button class="btn btn-sq-lg btn-success">
              <h2>Reading <br> Video</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/tests/blank-tests'">
            <button class="btn btn-sq-lg btn-success">
              <h2>Blank Tests</h2>
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