import { defineStore } from "pinia";
import { StateDynamoMeter } from "@/interfaces/dynamoMeter";

export const useDynamoMeterStore = defineStore("dynamoMeter", {
  state: (): StateDynamoMeter => {
    return {
      step: 1,
      prizeId: 1,
      prizes: [{ id: 1, image: "ruby", name: "Рубин", color: "#FF4646" }],
      power: 0,
      pointsToWin: 97,
      animateMeasure: false,
      showingMeasureEnd: false,
    };
  },

  getters: {
    getStep(state) {
      return state.step;
    },

    getPower(state) {
      return state.power;
    },

    getHasWin(state) {
      return state.power >= state.pointsToWin;
    },

    getPrize(state) {
      return state.prizes.find((item) => item.id === state.prizeId);
    },

    canStartAnimationMeasure(state) {
      return state.animateMeasure;
    },

    isShowingMeasureEnd(state) {
      return state.showingMeasureEnd;
    },
  },

  actions: {
    goToNextStep() {
      this.step += 1;
    },

    updatePower(newValue: number) {
      this.power = newValue;
    },

    resetAllValues() {
      this.step = 1;
      this.power = 0;
      this.animateMeasure = false;
      this.showingMeasureEnd = false;
    },

    startAnimationMeasure() {
      this.animateMeasure = true;
    },

    endAnimationMeasure() {
      this.showingMeasureEnd = true;
    },
  },
});
