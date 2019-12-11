<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">Panel Lektorski</h1>
    </div>
    <div class="row">
      <h1 class="col-12">Nowa treść</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-5">
            <router-link :to="'/CreateReadingVideoTest/'" class="col-5">
              <button class="btn-primary col-12 mb-2">
                Test reading/video
              </button>
            </router-link>
          </div>
          <div class="col-2"></div>
          <div class="col-5">
            <router-link :to="'/CreateBlankTest/'" class="col-5">
              <button class="btn-primary col-12 mb-2">
                Test z lukami
              </button>
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-5">
            <router-link :to="'/CreateGlossaryDefinition/'" class="col-5">
              <button class="btn-primary col-12 mb-2">
                Definicja do glosariusza
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h1 class="col-12">Istniejąca treść</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-5">
            <router-link :to="'/ReadGlossary/'" class="col-5">
              <button class="btn-primary col-12 mb-2">
                Glosariusz
              </button>
            </router-link>
          </div>
          <div class="col-2"></div>
          <div class="col-5">
            <router-link :to="'/About/'" class="col-5">
              <button class="btn-primary col-12 mb-2">
                lista testów
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
  name: "HomeLektor",
  data() {
    return {};
  },
  methods: {},
  mounted: {}
};
</script>
