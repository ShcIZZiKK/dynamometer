import { describe, it, expect } from "vitest";
import { useDynamoMeterStore } from "@/stores";
import useDynamoMeterUI from "@/components/DynamoMeter/DynamoMeterUI/composables/useDynamoMeterUI";

describe("useDynamoMeterUI", () => {
  it("на шаге 1 показывает приветствие и кнопку «New game»", () => {
    const store = useDynamoMeterStore();
    store.step = 1;

    const ui = useDynamoMeterUI();

    expect(ui.textUI.value).toContain("Let's test your strength!");
    expect(ui.textUIButton.value).toBe("New game");
    expect(ui.modifyUIButton.value).toBe("");
    expect(ui.isShowUIButton.value).toBe(true);
  });

  it("на шаге 2 показывает подсказку удара и жёлтую кнопку", () => {
    const store = useDynamoMeterStore();
    store.step = 2;

    const ui = useDynamoMeterUI();

    expect(ui.textUI.value).toContain("Hit the button");
    expect(ui.textUIButton.value).toBe("Punch");
    expect(ui.modifyUIButton.value).toBe("button_theme_yellow");
    expect(ui.isShowUIButton.value).toBe(true);
  });

  it("на шаге 3 скрывает кнопку управления до конца анимации шкалы", () => {
    const store = useDynamoMeterStore();
    store.step = 3;
    store.showingMeasureEnd = false;

    const ui = useDynamoMeterUI();

    expect(ui.isShowUIButton.value).toBe(false);

    store.showingMeasureEnd = true;
    expect(ui.isShowUIButton.value).toBe(true);
  });

  it("показывает сообщение о победе с названием и цветом приза", () => {
    const store = useDynamoMeterStore();
    store.step = 3;
    store.power = 100;
    store.prizeId = 1;
    store.showingMeasureEnd = true;

    const ui = useDynamoMeterUI();

    expect(ui.textUI.value).toContain("THAT'S THE POWER!");
    expect(ui.textUI.value).toContain("Ruby");
    expect(ui.textUI.value).toContain("#ff4646");
    expect(ui.textUIButton.value).toBe("New game");
  });

  it("показывает сообщение о повторной попытке при проигрыше", () => {
    const store = useDynamoMeterStore();
    store.step = 3;
    store.power = 50;
    store.showingMeasureEnd = true;

    const ui = useDynamoMeterUI();

    expect(ui.textUI.value).toContain("Not bad!");
    expect(ui.textUI.value).toContain("Try again.");
  });
});
