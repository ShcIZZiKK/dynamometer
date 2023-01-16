<template>
  <div class="dynamo-meter-button">
    <div class="dynamo-meter-button__base">
      <div class="dynamo-meter-button__base-top"></div>
      <div class="dynamo-meter-button__base-bottom"></div>
      <div class="dynamo-meter-button__base-light"></div>
    </div>

    <div
      :class="['dynamo-meter-button__action', { 'is-active': isButtonPress }]"
    >
      <div class="dynamo-meter-button__action-top" ref="button"></div>
      <div class="dynamo-meter-button__action-bottom"></div>
    </div>

    <div :class="['dynamo-meter-button__trigger', `is-step-${step}`]">
      <IconHammer />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useDynamoMeterStore } from "@/stores";
import IconHammer from "@/components/Svg/Hammer.vue";

export default defineComponent({
  name: "DynamoMeterButton",

  components: {
    IconHammer,
  },

  setup() {
    /**
     * html element as a button
     */
    const button = ref<HTMLInputElement | null>(null);
    /**
     * Store
     */
    const dynamoMeterStore = useDynamoMeterStore();
    /**
     * Game current progress
     */
    const step = computed(() => {
      return dynamoMeterStore.getStep;
    });
    /**
     * Trigger that the button is pressed
     */
    const isButtonPress = computed(() => {
      return step.value === 3;
    });

    /**
     * Starts the animation of the scale
     */
    const callButtonPressed = () => {
      dynamoMeterStore.startAnimationMeasure();
    };

    /**
     * Hanging the event on the button, so that at the end of the animation
     * the next step of the game will be executed
     */
    onMounted(() => {
      button.value?.addEventListener("animationend", () => {
        callButtonPressed();
      });
    });

    return {
      button,
      isButtonPress,
      step,
    };
  },
});
</script>

<style lang="scss">
@import "DynamoMeterButton";
</style>
