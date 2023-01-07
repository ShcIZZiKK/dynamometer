<template>
  <DynamoMeterApp />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DynamoMeterApp from "@/components/DynamoMeter/DynamoMeterApp.vue";

export default defineComponent({
  name: "App",

  components: {
    DynamoMeterApp,
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Roboto", sans-serif;
}

* {
  box-sizing: border-box;
}
</style>
