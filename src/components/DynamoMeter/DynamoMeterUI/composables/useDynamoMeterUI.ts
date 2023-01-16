import { computed } from "vue";
import { useDynamoMeterStore } from "@/stores";

export default function useDynamoMeterUI() {
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
   * Is there enough strength to win?
   */
  const isWin = computed(() => {
    return dynamoMeterStore.getHasWin;
  });

  /**
   * Do we show the button to control the game
   */
  const isShowUIButton = computed(() => {
    return step.value !== 3 || dynamoMeterStore.isShowingMeasureEnd;
  });

  /**
   * Game text to show game status
   */
  const textUI = computed(() => {
    switch (step.value) {
      case 1:
        return "Hi!<br/>Let's test your strength!";
      case 2:
        return "Hit the button<br/>at the right moment!";
      default:
        return isWin.value
          ? `<b>THAT'S THE POWER!</b><br/>
            You beat out the grand prize!<br/>
            <span style="color: ${dynamoMeterStore.getPrize?.color}">${dynamoMeterStore.getPrize?.name}</span>`
          : "Not bad!<br/>Try again.";
    }
  });

  /**
   * Text of the button to control the game
   */
  const textUIButton = computed(() => {
    return step.value === 2 ? "Punch" : "New game";
  });

  /**
   * Modification of the button to control the game
   */
  const modifyUIButton = computed(() => {
    return step.value === 2 ? "button_theme_yellow" : "";
  });

  return {
    isShowUIButton,
    modifyUIButton,
    textUI,
    textUIButton,
  };
}
