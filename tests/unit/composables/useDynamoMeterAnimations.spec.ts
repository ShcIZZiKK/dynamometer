import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { useDynamoMeterStore } from "@/stores";
import useDynamoMeterAnimations from "@/components/DynamoMeter/DynamoMeterUI/composables/useDynamoMeterAnimations";

describe("useDynamoMeterAnimations", () => {
  let rafCallbacks: FrameRequestCallback[];
  let rafId: number;

  beforeEach(() => {
    rafCallbacks = [];
    rafId = 0;

    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((cb: FrameRequestCallback) => {
        rafCallbacks.push(cb);
        rafId += 1;
        return rafId;
      })
    );

    vi.stubGlobal(
      "cancelAnimationFrame",
      vi.fn(() => {
        rafCallbacks = [];
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const flushFrames = (count: number) => {
    for (let i = 0; i < count; i += 1) {
      const callbacks = [...rafCallbacks];
      rafCallbacks = [];
      callbacks.forEach((cb) => cb(performance.now()));
    }
  };

  const mountAnimations = () => {
    const Harness = defineComponent({
      setup() {
        return useDynamoMeterAnimations();
      },
      template: "<div />",
    });

    return mount(Harness);
  };

  it("запускает анимацию силы и переходит на шаг 2 при первом действии", () => {
    const store = useDynamoMeterStore();
    const wrapper = mountAnimations();

    wrapper.vm.actionGame();

    expect(store.step).toBe(2);
    expect(requestAnimationFrame).toHaveBeenCalled();
    expect(wrapper.vm.power).toBe(1.5);

    flushFrames(1);
    expect(wrapper.vm.power).toBe(3);
  });

  it("на ударе останавливает анимацию, сохраняет силу и переходит на шаг 3", () => {
    const store = useDynamoMeterStore();
    const wrapper = mountAnimations();

    wrapper.vm.actionGame();
    flushFrames(10);
    const punchedPower = wrapper.vm.power;

    wrapper.vm.actionGame();

    expect(cancelAnimationFrame).toHaveBeenCalled();
    expect(store.power).toBe(punchedPower);
    expect(store.step).toBe(3);
  });

  it("сбрасывает состояние игры при действии после шага 3", () => {
    const store = useDynamoMeterStore();
    const wrapper = mountAnimations();

    store.step = 3;
    store.power = 40;
    store.animateMeasure = true;
    store.showingMeasureEnd = true;

    wrapper.vm.actionGame();

    expect(store.step).toBe(1);
    expect(store.power).toBe(0);
    expect(store.animateMeasure).toBe(false);
    expect(store.showingMeasureEnd).toBe(false);
  });

  it("уменьшает силу после достижения верхней границы", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountAnimations();

    wrapper.vm.actionGame();
    wrapper.vm.power = 100;
    await nextTick();

    flushFrames(1);

    expect(wrapper.vm.power).toBe(98.5);
    expect(store.step).toBe(2);
  });

  it("увеличивает силу после достижения нижней границы", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountAnimations();

    wrapper.vm.actionGame();
    wrapper.vm.power = 100;
    await nextTick();
    flushFrames(1);
    expect(wrapper.vm.power).toBeLessThan(100);

    wrapper.vm.power = 0;
    await nextTick();
    flushFrames(1);

    expect(wrapper.vm.power).toBe(1.5);
    expect(store.step).toBe(2);
  });

  it("сбрасывает локальную силу при возврате на шаг 1", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountAnimations();

    wrapper.vm.actionGame();
    await nextTick();
    wrapper.vm.power = 9;
    await nextTick();

    wrapper.vm.actionGame();
    await nextTick();
    expect(store.step).toBe(3);

    wrapper.vm.actionGame();
    await nextTick();

    expect(store.step).toBe(1);
    expect(wrapper.vm.power).toBe(0);
  });

  it("засчитывает победу, если сила удара достигает порога", () => {
    const store = useDynamoMeterStore();
    const wrapper = mountAnimations();

    wrapper.vm.actionGame();
    wrapper.vm.power = 97;
    wrapper.vm.actionGame();

    expect(store.getHasWin).toBe(true);
    expect(store.getPrize?.count).toBe(1);
  });
});
