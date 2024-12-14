import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import react from "./react.js";

export default tseslint.config(...react, {
  plugins: {
    "@next/next": nextPlugin,
  },
  ignores: ["next.config.js"],
  rules: {
    ...nextPlugin.configs.recommended?.rules,
  },
});
