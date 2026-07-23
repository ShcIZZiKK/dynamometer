module.exports = {
  root: true,
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.{ts,tsx}", "**/__tests__/*.{ts,tsx}", "**/*.{spec,test}.{ts,tsx}"],
      env: {
        jest: true,
      },
    },
  ],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
