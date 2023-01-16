import { computed, ref, watch } from "vue";
import { useDynamoMeterStore } from "@/stores";

export default function useDynamoMeterAnimations() {
  /**
   * Impact force from 0 to 100
   */
  const power = ref(0);
  /**
   * The direction in which the power scale now moves 1 - up, -1 - down
   */
  const direction = ref(1);
  /**
   * The speed at which the scale moves
   */
  const speed = 1.5;
  /**
   * Animation
   */
  let reqAnim: number;

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
   * Triggers the impact force scale animation
   */
  const animateScalePower = () => {
    if (direction.value > 0) {
      power.value += speed;
    } else {
      power.value -= speed;
    }

    reqAnim = window.requestAnimationFrame(animateScalePower);
  };

  /**
   * Stops the animation of the scale
   */
  const stopAnimationScalePower = () => {
    window.cancelAnimationFrame(reqAnim);
  };

  /**
   * Changes the current pitch of the game
   */
  const actionGame = () => {
    switch (step.value) {
      case 1:
        animateScalePower();
        dynamoMeterStore.goToNextStep();
        break;
      case 2:
        stopAnimationScalePower();
        dynamoMeterStore.updatePower(power.value);
        dynamoMeterStore.goToNextStep();
        break;
      default:
        dynamoMeterStore.resetAllValues();
        break;
    }
  };

  /**
   * Tracking changes in scale direction
   */
  watch(power, (newValue) => {
    if (newValue >= 100) {
      direction.value = -1;
    }

    if (newValue <= 0) {
      direction.value = 1;
    }
  });

  /**
   * Resetting the scale at game start
   */
  watch(step, (newValue) => {
    if (newValue === 1) {
      power.value = 0;
    }
  });

  return {
    actionGame,
    power,
  };
}
