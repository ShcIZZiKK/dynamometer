import { computed } from "vue";
import { useDynamoMeterStore } from "@/stores";

export default function useDynamoMeterUI() {
  const dynamoMeterStore = useDynamoMeterStore();
  const step = computed(() => {
    return dynamoMeterStore.getStep;
  });
  const isWin = computed(() => {
    return dynamoMeterStore.getHasWin;
  });
  const isShowUIButton = computed(() => {
    return step.value !== 3 || dynamoMeterStore.isShowingMeasureEnd;
  });

  const textUI = computed(() => {
    switch (step.value) {
      case 1:
        return "Привет!<br/>проверим твою силу!";
      case 2:
        return "Жми на кнопку<br/>в нужный момент!";
      default:
        return isWin.value
          ? `<b>ВОТ ЭТО СИЛА!</b><br/>
            Ты выбил главный приз!<br/>
            <span style="color: ${dynamoMeterStore.getPrize?.color}">${dynamoMeterStore.getPrize?.name}</span>`
          : "Неплохо!<br/>Попробуй ещё раз.";
    }
  });

  const textUIButton = computed(() => {
    return step.value === 2 ? "Удар" : "Новая игра";
  });

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
