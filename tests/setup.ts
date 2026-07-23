import { config } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, vi } from "vitest";

config.global.stubs = {
  Transition: {
    template: "<div><slot /></div>",
  },
  "transition-group": {
    template: "<div><slot /></div>",
  },
};

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);
  config.global.plugins = [pinia];
  vi.restoreAllMocks();
});
