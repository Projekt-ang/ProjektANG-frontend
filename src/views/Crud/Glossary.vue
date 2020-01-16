<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <router-link :to="'/create-glossary-definition'">
          <button type="button" class="btn-primary col-12 mt-5">Nowa definicja</button>
        </router-link>
        <router-link :to="'/read-glossary'">
          <button type="button" class="btn-primary col-12 mt-5">Przeglądaj Gloasriusz</button>
        </router-link>
      </div>
    </div>
  </div>
</template>