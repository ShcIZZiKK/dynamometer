<template>
  <button :class="['button', modify]"><slot /></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseButton",

  props: {
    modify: [Array, Object, String],
  },
});
</script>

<style lang="scss" scoped>
@import "BaseButton";
</style>
