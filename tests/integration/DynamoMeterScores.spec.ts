import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import DynamoMeterScores from "@/components/DynamoMeter/DynamoMeterScores/DynamoMeterScores.vue";
import { useDynamoMeterStore } from "@/stores";

describe("DynamoMeterScores integration", () => {
  const mountScores = () => mount(DynamoMeterScores);

  it("рендерит счётчик для каждого приза", () => {
    const wrapper = mountScores();
    const items = wrapper.findAll(".dynamo-meter-scores__list-item");

    expect(items).toHaveLength(3);
    items.forEach((item) => {
      expect(item.find(".dynamo-meter-scores__list-item-count").text()).toBe(
        "0"
      );
    });
  });

  it("обновляет счётчики после победы в store", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountScores();

    store.updatePower(97);
    await nextTick();

    const counts = wrapper
      .findAll(".dynamo-meter-scores__list-item-count")
      .map((node) => node.text());

    expect(counts).toContain("1");
    expect(counts.filter((count) => count === "0")).toHaveLength(2);
  });

  it("оставляет нули, если сила ниже порога победы", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountScores();

    store.updatePower(50);
    await nextTick();

    const counts = wrapper.findAll(".dynamo-meter-scores__list-item-count");
    counts.forEach((node) => {
      expect(node.text()).toBe("0");
    });
  });
});
