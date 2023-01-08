<template>
  <svg
    width="110"
    height="110"
    viewBox="0 0 110 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="[{ 'is-active': isShow }, modify]"
  >
    <g clip-path="url(#clip0_37_554)">
      <path
        d="M57.4819 11.4821L63.3607 40.3302L86.4074 22.0101L72.3676 47.8878L101.798 48.6679L74.4093 59.4668L96.4531 78.9821L68.5305 69.6492L72.8728 98.7682L57.4819 73.6705L42.091 98.7682L46.4334 69.6492L18.5108 78.9821L40.5546 59.4668L13.1656 48.6679L42.5963 47.8878L28.5565 22.0101L51.6031 40.3302L57.4819 11.4821Z"
        fill="#FFF7CE"
      />
      <path
        d="M73.9471 4.99389L62.639 46.0542L101.617 28.8912L66.561 53.0765L107.452 64.9832L65.0516 60.9769L88.7223 96.382L58.8171 66.0588L54.1918 108.396L50.7745 65.9442L20.0177 95.4033L44.6872 60.6868L2.19023 63.4836L43.4035 52.7466L9.05115 27.5725L47.524 45.8388L37.3901 4.47311L55.1207 43.1958L73.9471 4.99389Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_37_554">
        <rect width="110" height="110" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useDynamoMeterStore } from "@/stores";

export default defineComponent({
  name: "IconPrizeGlow",

  props: {
    modify: [Array, Object, String],
  },

  setup() {
    const dynamoMeterStore = useDynamoMeterStore();
    const isShow = computed(() => {
      return dynamoMeterStore.isShowingMeasureEnd && dynamoMeterStore.getHasWin;
    });

    return {
      isShow,
    };
  },
});
</script>

<style lang="scss" scoped>
svg {
  opacity: 0;
  width: 10px;
  height: 10px;
  animation-duration: 0.3s;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;

  &.is-active {
    animation-name: show;

    path {
      animation-name: rotate;

      &:last-child {
        animation-name: reverse-rotate;
      }
    }
  }

  path {
    animation-duration: 8s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    transform-origin: center;

    &:last-child {
      animation-duration: 10s;
    }
  }
}

// ANIMATIONS
@keyframes show {
  0% {
    opacity: 0;
    width: 10px;
    height: 10px;
  }

  100% {
    opacity: 1;
    width: 110px;
    height: 110px;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes reverse-rotate {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-180deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
