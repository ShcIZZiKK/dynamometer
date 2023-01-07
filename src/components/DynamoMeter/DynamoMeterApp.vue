<template>
  <div class="dynamo-meter">
    <div class="dynamo-meter__background">
      <picture>
        <source
          srcset="@/assets/images/bg_top_web@2x.png"
          media="(min-width: 361px)"
        />
        <img src="@/assets/images/bg_top@2x.png" alt="Силомер" />
      </picture>
    </div>

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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DynamoMeterButton from "@/components/DynamoMeter/DynamoMeterButton/DynamoMeterButton.vue";
import DynamoMeterMeasure from "@/components/DynamoMeter/DynamoMeterMeasure/DynamoMeterMeasure.vue";
import DynamoMeterUI from "@/components/DynamoMeter/DynamoMeterUI/DynamoMeterUI.vue";

export default defineComponent({
  name: "DynamoMeterApp",

  components: {
    DynamoMeterButton,
    DynamoMeterMeasure,
    DynamoMeterUI,
  },
});
</script>

<style scoped lang="scss">
@import "DynamoMeterApp";
</style>
