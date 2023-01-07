import { computed, ref, watch } from "vue";
import { useDynamoMeterStore } from "@/stores";

export default function useDynamoMeterAnimations() {
  /**
   * Сила удара от 0 до 100
   */
  const power = ref(0);
  /**
   * Направление, куда сейчас движется шкала силы 1 - вверх, -1 - вниз
   */
  const direction = ref(1);
  /**
   * Скорость с которой движется шкала
   */
  const speed = 1.5;
  /**
   * Анимация
   */
  let reqAnim: number;

  const dynamoMeterStore = useDynamoMeterStore();
  const step = computed(() => {
    return dynamoMeterStore.getStep;
  });

  /**
   * Запускает анимацию шкалы силы удара
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
   * Останавливает анимацию шкалы
   */
  const stopAnimationScalePower = () => {
    window.cancelAnimationFrame(reqAnim);
  };

  /**
   * Изменяет текущий шаг игры
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

  watch(power, (newValue) => {
    if (newValue >= 100) {
      direction.value = -1;
    }

    if (newValue <= 0) {
      direction.value = 1;
    }
  });

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
