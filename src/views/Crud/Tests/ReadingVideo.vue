<template>
  <div class="about">
    <h1>CRUD Reading Video Tests</h1>
    <div>
      <RVTests />
    </div>
  </div>
</template>


<script>
import RVTests from "@/components/RVTests";

export default {
  name: "RVTestsList",
  components: {
    RVTests,
  },
  data() {
    return {
    };
  },
};
</script>
