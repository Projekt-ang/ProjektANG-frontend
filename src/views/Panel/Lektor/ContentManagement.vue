<template>
  <div class="vertical-center">
    <div class="container">
      <h1>Zarządzanie Treścią</h1>
      <div class="row">
        <div class="col-sm">
          <router-link :to="'/crud/tests'">
            <button class="btn btn-sq-lg btn-primary">
              <h2>Testy</h2>
            </button>
          </router-link>
        </div>
        <div class="col-sm">
          <router-link :to="'/crud/glossary'">
            <button class="btn btn-sq-lg btn-danger">
              <h2>Glosariusz</h2>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>