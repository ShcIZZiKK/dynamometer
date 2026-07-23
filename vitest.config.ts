import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import type { Plugin } from "vite";

/**
 * Webpack-style require() is used for dynamic assets in SFCs.
 * Replace with a stable mock URL so component tests can mount.
 */
function webpackRequireMock(): Plugin {
  return {
    name: "webpack-require-mock",
    enforce: "pre",
    transform(code, id) {
      if (!/\.(vue|ts|js)$/.test(id) || id.includes("node_modules")) {
        return null;
      }

      if (!code.includes("require(")) {
        return null;
      }

      return {
        code: code.replace(/require\(([^)]+)\)/g, "'/mock-asset.png'"),
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [webpackRequireMock(), vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.{test,spec}.{js,ts}"],
    css: true,
  },
});
