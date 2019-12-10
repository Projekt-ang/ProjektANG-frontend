<template>
  <div class="container">
    <div class="row">
      <button
        type="button"
        class="btn-primary col-12 mt-5"
        @click="setComponent('panel')"
        v-if="activeComponent!='panel'"
      >Powrót do panelu</button>
    </div>
    <div v-if="activeComponent=='panel'">
      <div class="row">
        <h1 class="col-12 mt-3">Dostępna treść</h1>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <button class="btn-primary col-5" @click="setComponent('testList')">Testy</button>
            <div class="col-2"></div>
            <button class="btn-primary col-5" @click="setComponent('readGlossary')">Glosariusz</button>
          </div>
        </div>
      </div>
    </div>
    <readGlossary :userRole="userRole" v-if="activeComponent=='readGlossary'"/>
    <testList :userRole="userRole" v-if="activeComponent=='testList'"/>
  </div>
</template>

<script>
import readGlossary from "@/components/ReadGlossary.vue";
import testList from "@/components/About.vue";
export default {
  name: "HomeUser",
  props: ["userRole"],
  components: { testList, readGlossary },
  data() {
    return {
      activeComponent: ""
    };
  },
  methods: {
    setComponent: function(componentName) {
      this.activeComponent = componentName;
    }
  },
  mounted() {
    this.activeComponent = "panel";
  }
};
</script>