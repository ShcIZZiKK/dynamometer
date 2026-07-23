import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import DynamoMeterUI from "@/components/DynamoMeter/DynamoMeterUI/DynamoMeterUI.vue";
import { useDynamoMeterStore } from "@/stores";

describe("DynamoMeterUI integration", () => {
  let rafCallbacks: FrameRequestCallback[];

  beforeEach(() => {
    rafCallbacks = [];

    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((cb: FrameRequestCallback) => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
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

  const mountUI = () =>
    mount(DynamoMeterUI, {
      global: {
        stubs: {
          IconRobot: true,
          Transition: {
            template: "<div><slot /></div>",
          },
        },
      },
    });

  const flushFrames = (count: number) => {
    for (let i = 0; i < count; i += 1) {
      const callbacks = [...rafCallbacks];
      rafCallbacks = [];
      callbacks.forEach((cb) => cb(performance.now()));
    }
  };

  it("при монтировании показывает начальное состояние", () => {
    const wrapper = mountUI();

    expect(wrapper.text()).toContain("New game");
    expect(wrapper.html()).toContain("Let's test your strength!");
  });

  it("начинает раунд по клику на «New game»", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountUI();

    await wrapper.find("button").trigger("click");
    await nextTick();

    expect(store.step).toBe(2);
    expect(wrapper.text()).toContain("Punch");
    expect(wrapper.html()).toContain("Hit the button");
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it("наносит удар, сохраняет силу и переходит к результату", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountUI();

    await wrapper.find("button").trigger("click");
    flushFrames(20);
    await nextTick();

    await wrapper.find("button").trigger("click");
    await nextTick();

    expect(store.step).toBe(3);
    expect(store.power).toBeGreaterThan(0);
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it("скрывает управление до конца шкалы, затем показывает результат и позволяет перезапуск", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountUI();

    await wrapper.find("button").trigger("click");
    flushFrames(70);
    await wrapper.find("button").trigger("click");
    await nextTick();

    expect(store.step).toBe(3);
    expect(store.isShowingMeasureEnd).toBe(false);

    const control = wrapper.find(".dynamo-meter-ui__control");
    expect(control.attributes("style") || "").toMatch(/display:\s*none/);

    store.endAnimationMeasure();
    await nextTick();
    await flushPromises();

    expect(store.isShowingMeasureEnd).toBe(true);
    expect(control.attributes("style") || "").not.toMatch(/display:\s*none/);
    expect(wrapper.text()).toContain("New game");

    if (store.getHasWin) {
      expect(wrapper.html()).toContain("THAT'S THE POWER!");
    } else {
      expect(wrapper.html()).toContain("Not bad!");
    }

    await wrapper.find("button").trigger("click");
    await nextTick();

    expect(store.step).toBe(1);
    expect(store.power).toBe(0);
  });

  it("обновляет высоту шкалы во время анимации силы", async () => {
    const wrapper = mountUI();

    await wrapper.find("button").trigger("click");
    flushFrames(5);
    await nextTick();

    const scale = wrapper.find(".dynamo-meter-ui__scale-active");
    expect(scale.attributes("style")).toMatch(/height:\s*[1-9]/);
  });
});
