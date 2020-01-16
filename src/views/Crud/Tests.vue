<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <router-link :to="'/crud/tests/blank'">
          <button type="button" class="btn-primary col-12">Testy z lukami</button>
        </router-link>
        <router-link :to="'/crud/tests/reading-video'">
          <button type="button" class="btn-primary mt-5 col-12">testy reading / video</button>
        </router-link>
      </div>
    </div>
  </div>
</template>