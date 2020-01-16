<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5">
        <router-link :to="'/mass-register'">
          <button type="button" class="btn-primary col-12">Rejestracja masowa</button>
        </router-link>
        <router-link :to="'/panel/lektor/users/users-management'">
          <button type="button" class="btn-primary col-12 mt-5">Zarządzanie istniejącymi kontami</button>
        </router-link>
      </div>
    </div>
  </div>
</template>