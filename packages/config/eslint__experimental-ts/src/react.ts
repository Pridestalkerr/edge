import type { PluginFlatConfig } from "eslint-plugin-import-x/types.js";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import { config } from "typescript-eslint";
import base from "./base";

export default config(
  ...base,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJsxA11y.flatConfigs.recommended,
  /**
   * NOTE: Types for eslint-plugin-react are broken. Temporary type assertion.
   * @link https://github.com/jsx-eslint/eslint-plugin-react/issues/3838
   */
  reactPlugin.configs.flat!["recommended"] as PluginFlatConfig,
  reactPlugin.configs.flat!["jsx-recommended"] as PluginFlatConfig,
  /**
   * eslint-plugin-react-hooks doesn't use FlatConfig yet.
   * @see https://www.npmjs.com/package/eslint-plugin-react-hooks
   */
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended!.rules,
      // NOTE: may want to disable exhaustive deps
      // "react-hooks/exhaustive-deps": "off",
    },
  },
  ...tailwind.configs["flat/recommended"],
  /* ours */
  {
    rules: {
      "react/no-children-prop": "off",
    },
  },
);
