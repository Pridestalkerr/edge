import nextPlugin from "@next/eslint-plugin-next";
import { config } from "typescript-eslint";
import react from "./react";

export default config(...react, {
  plugins: {
    next: nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended?.rules,
  },
});
