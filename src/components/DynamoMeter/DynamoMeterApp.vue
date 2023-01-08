<template>
  <div class="dynamo-meter">
    <div class="dynamo-meter__background">
      <div class="dynamo-meter__background-decorations">
        <IconDecorations />
      </div>
      <div class="dynamo-meter__background-lines">
        <IconLines />
      </div>
    </div>

    <div :class="['dynamo-meter__container', { 'is-restart': isBlur }]">
      <DynamoMeterScores />

      <div class="dynamo-meter__measure-wrapper">
        <DynamoMeterMeasure />
      </div>

      <div class="dynamo-meter__button-wrapper">
        <DynamoMeterButton />
      </div>
      <div class="dynamo-meter__ui-wrapper">
        <DynamoMeterUI />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref } from "vue";
import DynamoMeterButton from "@/components/DynamoMeter/DynamoMeterButton/DynamoMeterButton.vue";
import DynamoMeterMeasure from "@/components/DynamoMeter/DynamoMeterMeasure/DynamoMeterMeasure.vue";
import DynamoMeterScores from "@/components/DynamoMeter/DynamoMeterScores/DynamoMeterScores.vue";
import DynamoMeterUI from "@/components/DynamoMeter/DynamoMeterUI/DynamoMeterUI.vue";
import IconDecorations from "@/components/Svg/Decorations.vue";
import IconLines from "@/components/Svg/Lines.vue";
import { useDynamoMeterStore } from "@/stores";

export default defineComponent({
  name: "DynamoMeterApp",

  components: {
    DynamoMeterButton,
    DynamoMeterMeasure,
    DynamoMeterScores,
    DynamoMeterUI,
    IconDecorations,
    IconLines,
  },

  setup() {
    const isFirstLoad = ref(true);
    const dynamoMeterStore = useDynamoMeterStore();
    const step = computed(() => {
      return dynamoMeterStore.getStep;
    });
    const isBlur = computed(() => {
      return step.value === 1 && !isFirstLoad.value;
    });

    watch(step, () => {
      isFirstLoad.value = false;
    });

    return {
      isBlur,
    };
  },
});
</script>

<style scoped lang="scss">
@import "DynamoMeterApp";
</style>
