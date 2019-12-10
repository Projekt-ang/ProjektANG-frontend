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
      <div class="row"></div>
      <div class="row">
        <h1 class="mt-3 col-12">Nowa treść</h1>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <button class="btn-primary col-5" @click="setComponent('createBlankTest')">Test z lukami</button>
            <div class="col-2"></div>
            <button
              class="btn-primary col-5"
              @click="setComponent('createReadingVideoTest')"
            >Test reading/video</button>
          </div>
          <div class="row mt-4">
            <button
              class="btn-primary col-5"
              @click="setComponent('createGlossaryDefinition')"
            >Definicja do glosariusza</button>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <h1 class="mt-3 col-12">Istniejąca treść treść</h1>
      </div>
      <div class="row">
        <div class="col-12">
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
      </div>
    </div>

    <div v-if="activeComponent=='createReadingVideoTest'">
      <createReadingVideoTest/>
    </div>
    <div v-if="activeComponent=='createBlankTest'">
      <createBlankTest/>
    </div>
    <div v-if="activeComponent=='createGlossaryDefinition'">
      <createGlossaryDefinition/>
    </div>
    <div v-if="activeComponent=='readGlossary'">
      <readGlossary :userRole="userRole"/>
    </div>
    <div v-if="activeComponent=='testList'">
      <testList/>
    </div>
  </div>
</template>

<script>
import createReadingVideoTest from "@/components/CreateReadingVideoTest.vue";
import createBlankTest from "@/components/CreateBlankTest.vue";
import testList from "@/components/About.vue";
import createGlossaryDefinition from "@/components/CreateGlossaryDefinition.vue";
import readGlossary from "@/components/ReadGlossary.vue";

export default {
  name: "HomeLektor",
  props: ["userRole"],
  data() {
    return {
      activeComponent: ""
    };
  },
  components: {
    createReadingVideoTest,
    createBlankTest,
    createGlossaryDefinition,
    readGlossary,
    testList
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

