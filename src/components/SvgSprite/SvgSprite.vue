<template>
  <svg :viewBox="icon.viewBox">
    <use :xlink:href="icon.url" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { IconInterface } from "@/interfaces/iconInterface";

export default defineComponent({
  name: "SvgSprite",

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const icon = computed((): IconInterface => {
      const iconProps = require(`@/assets/svg/${props.name}.svg`);

      return iconProps.default;
    });

    return { icon };
  },
});
</script>
