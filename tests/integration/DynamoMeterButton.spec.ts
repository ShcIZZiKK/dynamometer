import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import DynamoMeterButton from "@/components/DynamoMeter/DynamoMeterButton/DynamoMeterButton.vue";
import { useDynamoMeterStore } from "@/stores";

describe("DynamoMeterButton integration", () => {
  const mountButton = () =>
    mount(DynamoMeterButton, {
      global: {
        stubs: {
          IconHammer: true,
        },
      },
    });

  it("не нажата на ранних шагах", () => {
    const store = useDynamoMeterStore();
    store.step = 2;
    const wrapper = mountButton();

    expect(
      wrapper.find(".dynamo-meter-button__action").classes()
    ).not.toContain("is-active");
    expect(wrapper.find(".dynamo-meter-button__trigger").classes()).toContain(
      "is-step-2"
    );
  });

  it("помечает кнопку нажатой на шаге 3", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountButton();

    store.step = 3;
    await nextTick();

    expect(wrapper.find(".dynamo-meter-button__action").classes()).toContain(
      "is-active"
    );
    expect(wrapper.find(".dynamo-meter-button__trigger").classes()).toContain(
      "is-step-3"
    );
  });

  it("запускает анимацию шкалы по окончании анимации нажатия", async () => {
    const store = useDynamoMeterStore();
    const wrapper = mountButton();

    expect(store.animateMeasure).toBe(false);

    const top = wrapper.find(".dynamo-meter-button__action-top");
    await top.trigger("animationend");
    await nextTick();

    expect(store.animateMeasure).toBe(true);
  });
});
