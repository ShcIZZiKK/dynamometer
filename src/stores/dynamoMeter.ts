import { defineStore } from "pinia";
import { StateDynamoMeter } from "@/interfaces/dynamoMeter";

export const useDynamoMeterStore = defineStore("dynamoMeter", {
  state: (): StateDynamoMeter => {
    return {
      step: 1,
      prizeId: 1,
      prizes: [
        { id: 1, image: "ruby", name: "Рубин", color: "#ff4646", count: 0 },
        { id: 2, image: "diamond", name: "Алмаз", color: "#63b6df", count: 0 },
        { id: 3, image: "coin", name: "Монетка", color: "#ffdf35", count: 0 },
      ],
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

    getAllPrizes(state) {
      return state.prizes;
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

      this.saveScore();
    },

    saveScore() {
      if (!this.getHasWin) {
        return;
      }

      const currentPrize = this.getPrize;

      if (currentPrize) {
        currentPrize.count += 1;
      }
    },

    resetAllValues() {
      if (this.getHasWin) {
        this.updatePrize();
      }

      this.step = 1;
      this.power = 0;
      this.animateMeasure = false;
      this.showingMeasureEnd = false;
    },

    updatePrize() {
      const idsPrizes = this.prizes.map((item) => item.id);
      const size = idsPrizes.length;

      const getNewId = () => {
        const indexRandom = Math.floor(Math.random() * size);
        const newIdPrize = idsPrizes[indexRandom];

        if (newIdPrize !== this.prizeId) {
          this.prizeId = newIdPrize;

          return;
        }

        getNewId();
      };

      setTimeout(() => {
        getNewId();
      }, 3000);
    },

    startAnimationMeasure() {
      this.animateMeasure = true;
    },

    endAnimationMeasure() {
      this.showingMeasureEnd = true;
    },
  },
});
