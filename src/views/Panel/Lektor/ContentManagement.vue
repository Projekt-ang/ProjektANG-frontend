<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <router-link :to="'/Crud/Tests'">
          <button type="button" class="btn-primary col-12">Testy</button>
        </router-link>
        <router-link :to="'/Crud/Glossary'">
          <button type="button" class="btn-primary mt-5 col-12">Glosariusz</button>
        </router-link>
      </div>
    </div>
  </div>
</template>