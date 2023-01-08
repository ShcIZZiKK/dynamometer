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

    <Transition name="bounce">
      <div class="dynamo-meter-ui__control" v-show="isShowUIButton">
        <div class="dynamo-meter-ui__control-text" v-html="textUI"></div>
        <div class="dynamo-meter-ui__control-button">
          <BaseButton @click="actionGame" :modify="modifyUIButton">
            {{ textUIButton }}
          </BaseButton>
        </div>
      </div>
    </Transition>

    <div class="dynamo-meter-ui__assistant">
      <IconRobot state="start" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDynamoMeterAnimations from "@/components/DynamoMeter/DynamoMeterUI/composables/useDynamoMeterAnimations";
import useDynamoMeterUI from "@/components/DynamoMeter/DynamoMeterUI/composables/useDynamoMeterUI";
import BaseButton from "@/components/BaseButton/BaseButton.vue";
import IconRobot from "@/components/Svg/Robot.vue";

export default defineComponent({
  name: "DynamoMeterUI",

  components: {
    BaseButton,
    IconRobot,
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

.bounce-enter-active {
  animation: bounce-in 0.6s;
}

@keyframes bounce-in {
  0% {
    transform: translateX(-50%) scale(0);
  }
  50% {
    transform: translateX(-50%) scale(1.25);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}
</style>
