<template>
  <div class="table-responsive justify-content-center">
    <h1 class="m-2">Lista testów z lukami</h1>
    <table class="m-5 table table-striped table-hover table-bordered w-auto mx-auto">
      <thead>
        <tr>
          <td>Nazwa</td>
          <td>Autor</td>
          <td>Tagi</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(test, idx) in this.$store.state.blankTests" :key="idx">
          <td class="align-middle">
            <router-link :to="'/blank-test/'+test.id">
              <p>{{test.name}}</p>
            </router-link>
          </td>
          <td class="align-middle">{{test.author}}</td>
          <td class="align-middle">
            <div v-if="test.tags.length === 0">Brak</div>
            <div v-for="(tag, idx) in test.tags" :key="idx">{{tag.text}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ListaBlanks",

  data() {
    return {
      idTmp: undefined
    };
  },
  methods: {},
  mounted() {},
  computed: {}
};
</script>