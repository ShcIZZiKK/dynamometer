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
    const maxDelay = 1000;
    /**
     * Кол-во плашек в шкале силы
     */
    const measureSize = 7;
    /**
     * Сила удара
     */
    const power = ref(0);
    const dynamoMeterStore = useDynamoMeterStore();

    /**
     * Тригер, что можно запускать анимацию шкалы
     */
    const isCanStartAnim = computed(() => {
      return dynamoMeterStore.canStartAnimationMeasure;
    });

    /**
     * Набрано ли достаточное число силы для победы
     */
    const isWin = computed(() => {
      return dynamoMeterStore.getHasWin;
    });

    const isShowPrize = computed(() => {
      return dynamoMeterStore.isShowingMeasureEnd && isWin.value;
    });

    /**
     * Кол-во закрашиваемых плашек
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

    const prizeImage = computed(() => {
      return dynamoMeterStore.getPrize?.image;
    });

    watch(isCanStartAnim, (newValue) => {
      power.value = dynamoMeterStore.getPower;

      if (!newValue) {
        return;
      }

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
