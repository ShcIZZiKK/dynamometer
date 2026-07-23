import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import DynamoMeterApp from "@/components/DynamoMeter/DynamoMeterApp.vue";
import { useDynamoMeterStore } from "@/stores";

describe("DynamoMeterApp integration", () => {
  beforeEach(() => {
    vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const mountApp = () =>
    mount(DynamoMeterApp, {
      global: {
        stubs: {
          IconDecorations: true,
          IconLines: true,
          IconHammer: true,
          IconPrizeGlow: true,
          IconRobot: true,
          Transition: false,
        },
      },
    });

  it("не размывает контейнер при первой загрузке на шаге 1", () => {
    const wrapper = mountApp();

    expect(wrapper.find(".dynamo-meter__container").classes()).not.toContain(
      "is-restart"
    );
  });

  it("применяет размытие рестарта при возврате на шаг 1 после игры", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountApp();

    store.step = 2;
    await nextTick();
    store.step = 1;
    await nextTick();

    expect(wrapper.find(".dynamo-meter__container").classes()).toContain(
      "is-restart"
    );
  });

  it("собирает секции scores, measure, button и UI", () => {
    const wrapper = mountApp();

    expect(wrapper.find(".dynamo-meter-scores").exists()).toBe(true);
    expect(wrapper.find(".dynamo-meter-measure").exists()).toBe(true);
    expect(wrapper.find(".dynamo-meter-button").exists()).toBe(true);
    expect(wrapper.find(".dynamo-meter-ui").exists()).toBe(true);
  });
});
