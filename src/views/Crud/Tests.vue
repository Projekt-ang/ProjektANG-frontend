<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <router-link :to="'/Crud/Tests/Blank'">
          <button type="button" class="btn-primary col-12">Testy z lukami</button>
        </router-link>
        <router-link :to="'/Crud/Tests/ReadingVideo'">
          <button type="button" class="btn-primary mt-5 col-12">testy reading / video</button>
        </router-link>
      </div>
    </div>
  </div>
</template>