import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "@/components/BaseButton/BaseButton.vue";

describe("BaseButton", () => {
  it("рендерит содержимое слота", () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: "Punch",
      },
    });

    expect(wrapper.text()).toBe("Punch");
    expect(wrapper.element.tagName).toBe("BUTTON");
  });

  it("применяет класс модификатора", () => {
    const wrapper = mount(BaseButton, {
      props: {
        modify: "button_theme_yellow",
      },
      slots: {
        default: "Go",
      },
    });

    expect(wrapper.classes()).toContain("button");
    expect(wrapper.classes()).toContain("button_theme_yellow");
  });

  it("эмитит click при нажатии", async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: "New game",
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
