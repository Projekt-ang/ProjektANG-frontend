<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <router-link :to="'/CreateGlossaryDefinition'">
          <button type="button" class="btn-primary col-12 mt-5">Nowa definicja</button>
        </router-link>
        <router-link :to="'/ReadGlossary'">
          <button type="button" class="btn-primary col-12 mt-5">Przeglądaj Gloasriusz</button>
        </router-link>
      </div>
    </div>
  </div>
</template>