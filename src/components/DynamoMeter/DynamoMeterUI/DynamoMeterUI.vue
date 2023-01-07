<template>
  <div class="dynamo-meter-ui">
    <div class="dynamo-meter-ui__scale">
      <div class="dynamo-meter-ui__scale-bg">
        <span v-for="n in 12" :key="n"></span>
      </div>
      <div
        class="dynamo-meter-ui__scale-active"
        :style="`height: ${power}%`"
      ></div>
    </div>

    <Transition name="fade">
      <div class="dynamo-meter-ui__control" v-show="isShowUIButton">
        <div class="dynamo-meter-ui__control-text" v-html="textUI"></div>
        <div class="dynamo-meter-ui__control-button">
          <BaseButton @click="actionGame" :modify="modifyUIButton">
            {{ textUIButton }}
          </BaseButton>
        </div>
      </div>
    </Transition>

    <div class="dynamo-meter-ui__assistant"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDynamoMeterAnimations from "@/components/DynamoMeter/DynamoMeterUI/composables/useDynamoMeterAnimations";
import useDynamoMeterUI from "@/components/DynamoMeter/DynamoMeterUI/composables/useDynamoMeterUI";
import BaseButton from "@/components/BaseButton/BaseButton.vue";

export default defineComponent({
  name: "DynamoMeterUI",

  components: {
    BaseButton,
  },

  setup() {
    const { actionGame, power } = useDynamoMeterAnimations();
    const { isShowUIButton, modifyUIButton, textUI, textUIButton } =
      useDynamoMeterUI();

    return {
      actionGame,
      isShowUIButton,
      modifyUIButton,
      power,
      textUI,
      textUIButton,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "DynamoMeterUI";

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
