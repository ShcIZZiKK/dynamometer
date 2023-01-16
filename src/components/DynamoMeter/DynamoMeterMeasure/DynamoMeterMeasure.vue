<template>
  <div class="dynamo-meter-measure">
    <div class="dynamo-meter-measure__background">
      <img src="@/assets/images/measure_main.png" alt="measure" />
    </div>

    <div :class="['dynamo-meter-measure__prize', { 'is-active': isShowPrize }]">
      <img
        class="dynamo-meter-measure__prize-image"
        :src="require(`@/assets/images/prizes/${prizeImage}.png`)"
      />
      <div class="dynamo-meter-measure__prize-bg">
        <IconPrizeGlow />
      </div>
    </div>

    <div class="dynamo-meter-measure__items">
      <template v-for="n in measureSize" :key="n">
        <div
          class="dynamo-meter-measure__item"
          :class="{ 'is-active': n <= scale, 'is-last': n + 1 > scale }"
        >
          <span class="dynamo-meter-measure__item-glare"></span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import IconPrizeGlow from "@/components/Svg/PrizeGlow.vue";
import { useDynamoMeterStore } from "@/stores";

export default defineComponent({
  name: "DynamoMeterMeasure",

  components: {
    IconPrizeGlow,
  },

  setup() {
    /**
     * Maximum delay before displaying the result
     */
    const maxDelay = 1000;
    /**
     * Number of bars in the power scale
     */
    const measureSize = 7;
    /**
     * Impact force
     */
    const power = ref(0);

    /**
     * Store
     */
    const dynamoMeterStore = useDynamoMeterStore();

    /**
     * Trigger that you can run a scale animation
     */
    const isCanStartAnim = computed(() => {
      return dynamoMeterStore.canStartAnimationMeasure;
    });

    /**
     * Is there enough strength to win?
     */
    const isWin = computed(() => {
      return dynamoMeterStore.getHasWin;
    });

    /**
     * Do we show the prize?
     */
    const isShowPrize = computed(() => {
      return dynamoMeterStore.isShowingMeasureEnd && isWin.value;
    });

    /**
     * Number of painted strips
     */
    const scale = computed(() => {
      if (power.value === 0) {
        return 0;
      }

      if (isWin.value) {
        return measureSize;
      }

      return (measureSize * power.value) / 100;
    });

    /**
     * The name of the prize picture
     */
    const prizeImage = computed(() => {
      return dynamoMeterStore.getPrize?.image;
    });

    /**
     * Trace the start of the animation, and update the impact force value
     */
    watch(isCanStartAnim, (newValue) => {
      power.value = dynamoMeterStore.getPower;

      if (!newValue) {
        return;
      }

      /**
       * Reporting the end of the scale animation
       */
      setTimeout(() => {
        dynamoMeterStore.endAnimationMeasure();
      }, maxDelay * (power.value / 100));
    });

    return {
      measureSize,
      scale,
      isShowPrize,
      prizeImage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "DynamoMeterMeasure";
</style>
