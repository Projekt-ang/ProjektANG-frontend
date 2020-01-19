<template>
  <div class="vertical-center">
    <div class="container">
      <h1>Wybierz rodzaj testu</h1>
      <div class="row">
        <div class="col-sm">
          <router-link :to="'/crud/tests/blank'">
            <button class="btn btn-sq-lg btn-primary">
              <h2>Testy z lukami</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/crud/tests/reading-video'">
            <button class="btn btn-sq-lg btn-success">
              <h2>Testy Reading/Video</h2>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>