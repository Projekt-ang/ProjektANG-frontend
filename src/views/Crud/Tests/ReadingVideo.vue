<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <router-link :to="'/CreateReadingVideoTest'">
          <button type="button" class="btn-primary col-12">Stwórz</button>
        </router-link>
        <router-link :to="'/'">
          <button type="button" class="btn-primary mt-5 col-12">Przeglądaj</button>
        </router-link>
      </div>
    </div>
  </div>
</template>