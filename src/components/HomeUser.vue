<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12 mb-3">Dostępna treść</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-5">
            <router-link :to="'/About/'" class="col-5">
              <button class="btn-primary col-12 mb-2">
                Testy
              </button>
            </router-link>
          </div>
          <div class="col-2"></div>
          <div class="col-5">
            <router-link :to="'/ReadGlossary/'" class="col-5">
              <button class="btn-primary col-12 mb-2">
                Glosariusz
              </button>
            </router-link>
          </div>
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
