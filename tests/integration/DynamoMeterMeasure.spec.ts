import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import DynamoMeterMeasure from "@/components/DynamoMeter/DynamoMeterMeasure/DynamoMeterMeasure.vue";
import { useDynamoMeterStore } from "@/stores";

describe("DynamoMeterMeasure integration", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mountMeasure = () =>
    mount(DynamoMeterMeasure, {
      global: {
        stubs: {
          IconPrizeGlow: true,
        },
      },
    });

  it("по умолчанию рендерит семь неактивных делений шкалы", () => {
    const wrapper = mountMeasure();

    expect(wrapper.findAll(".dynamo-meter-measure__item")).toHaveLength(7);
    expect(
      wrapper.findAll(".dynamo-meter-measure__item.is-active")
    ).toHaveLength(0);
    expect(
      wrapper.find(".dynamo-meter-measure__prize").classes()
    ).not.toContain("is-active");
  });

  it("при победе заполняет все деления и завершает анимацию", async () => {
    const store = useDynamoMeterStore();
    store.power = 100;
    const wrapper = mountMeasure();

    store.startAnimationMeasure();
    await nextTick();

    expect(
      wrapper.findAll(".dynamo-meter-measure__item.is-active")
    ).toHaveLength(7);

    vi.advanceTimersByTime(1000);
    await nextTick();

    expect(store.showingMeasureEnd).toBe(true);
    expect(wrapper.find(".dynamo-meter-measure__prize").classes()).toContain(
      "is-active"
    );
  });

  it("при проигрыше заполняет деления пропорционально и не показывает приз", async () => {
    const store = useDynamoMeterStore();
    store.power = 50;
    const wrapper = mountMeasure();

    store.startAnimationMeasure();
    await nextTick();

    const activeCount = wrapper.findAll(
      ".dynamo-meter-measure__item.is-active"
    ).length;
    expect(activeCount).toBeGreaterThan(0);
    expect(activeCount).toBeLessThan(7);

    vi.advanceTimersByTime(500);
    await nextTick();

    expect(store.showingMeasureEnd).toBe(true);
    expect(
      wrapper.find(".dynamo-meter-measure__prize").classes()
    ).not.toContain("is-active");
  });

  it("масштабирует задержку анимации по доле силы", async () => {
    const store = useDynamoMeterStore();
    store.power = 25;
    mountMeasure();

    store.startAnimationMeasure();
    await nextTick();

    vi.advanceTimersByTime(249);
    expect(store.showingMeasureEnd).toBe(false);

    vi.advanceTimersByTime(1);
    expect(store.showingMeasureEnd).toBe(true);
  });
});
