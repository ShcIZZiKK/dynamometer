import { describe, it, expect, vi } from "vitest";
import { useDynamoMeterStore } from "@/stores";

describe("useDynamoMeterStore", () => {
  it("начинается с начального состояния игры", () => {
    const store = useDynamoMeterStore();

    expect(store.step).toBe(1);
    expect(store.power).toBe(0);
    expect(store.prizeId).toBe(1);
    expect(store.pointsToWin).toBe(97);
    expect(store.animateMeasure).toBe(false);
    expect(store.showingMeasureEnd).toBe(false);
    expect(store.prizes).toHaveLength(3);
    expect(store.prizes.every((prize) => prize.count === 0)).toBe(true);
  });

  describe("getters", () => {
    it("getHasWin ложен ниже порога и истинен на пороге победы", () => {
      const store = useDynamoMeterStore();

      store.power = 96;
      expect(store.getHasWin).toBe(false);

      store.power = 97;
      expect(store.getHasWin).toBe(true);

      store.power = 100;
      expect(store.getHasWin).toBe(true);
    });

    it("getPrize возвращает приз по prizeId", () => {
      const store = useDynamoMeterStore();

      expect(store.getPrize?.name).toBe("Ruby");

      store.prizeId = 2;
      expect(store.getPrize?.name).toBe("Diamond");
    });

    it("отдаёт step, power и флаги анимации через геттеры", () => {
      const store = useDynamoMeterStore();

      store.step = 2;
      store.power = 50;
      store.animateMeasure = true;
      store.showingMeasureEnd = true;

      expect(store.getStep).toBe(2);
      expect(store.getPower).toBe(50);
      expect(store.canStartAnimationMeasure).toBe(true);
      expect(store.isShowingMeasureEnd).toBe(true);
      expect(store.getAllPrizes).toEqual(store.prizes);
    });
  });

  describe("actions", () => {
    it("goToNextStep увеличивает шаг", () => {
      const store = useDynamoMeterStore();

      store.goToNextStep();
      expect(store.step).toBe(2);

      store.goToNextStep();
      expect(store.step).toBe(3);
    });

    it("updatePower задаёт силу и не сохраняет счёт при проигрыше", () => {
      const store = useDynamoMeterStore();

      store.updatePower(50);

      expect(store.power).toBe(50);
      expect(store.getPrize?.count).toBe(0);
    });

    it("updatePower увеличивает счёт текущего приза при победе", () => {
      const store = useDynamoMeterStore();

      store.updatePower(97);

      expect(store.power).toBe(97);
      expect(store.getHasWin).toBe(true);
      expect(store.getPrize?.count).toBe(1);
    });

    it("saveScore ничего не делает, если игрок не победил", () => {
      const store = useDynamoMeterStore();
      store.power = 10;

      store.saveScore();

      expect(store.prizes.every((prize) => prize.count === 0)).toBe(true);
    });

    it("updatePrize всегда выбирает другой id приза", () => {
      const store = useDynamoMeterStore();
      const previousId = store.prizeId;

      for (let i = 0; i < 20; i += 1) {
        store.updatePrize();
        expect(store.prizeId).not.toBe(previousId);
        store.prizeId = previousId;
      }
    });

    it("resetAllValues сбрасывает состояние без смены приза при проигрыше", () => {
      const store = useDynamoMeterStore();
      store.step = 3;
      store.power = 40;
      store.animateMeasure = true;
      store.showingMeasureEnd = true;
      store.prizeId = 2;

      store.resetAllValues();

      expect(store.step).toBe(1);
      expect(store.power).toBe(0);
      expect(store.animateMeasure).toBe(false);
      expect(store.showingMeasureEnd).toBe(false);
      expect(store.prizeId).toBe(1);
    });

    it("resetAllValues меняет приз после победы", () => {
      const store = useDynamoMeterStore();
      store.power = 100;
      store.prizeId = 1;
      const previousPrizeId = store.prizeId;

      store.resetAllValues();

      expect(store.step).toBe(1);
      expect(store.power).toBe(0);
      expect(store.prizeId).not.toBe(previousPrizeId);
    });

    it("startAnimationMeasure и endAnimationMeasure переключают флаги", () => {
      const store = useDynamoMeterStore();

      store.startAnimationMeasure();
      expect(store.animateMeasure).toBe(true);

      store.endAnimationMeasure();
      expect(store.showingMeasureEnd).toBe(true);
    });
  });
});
