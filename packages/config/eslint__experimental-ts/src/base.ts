import eslint from "@eslint/js";
import type { TSESLint } from "@typescript-eslint/utils";
import eslintPluginImportX from "eslint-plugin-import-x";
import recommendedPluginPrettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

const config: TSESLint.FlatConfig.Config[] = tseslint.config(
  /** @link https://typescript-eslint.io/getting-started/typed-linting */
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
        sourceType: "module",
      },
    },
  },
  /** @link https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#configuration-new-eslintconfigjs */
  {
    plugins: {
      "import-x": eslintPluginImportX,
    },
  },
  eslintPluginImportX.flatConfigs.typescript,
  {
    rules: {
      "import-x/no-dynamic-require": "warn",
    },
  },
  recommendedPluginPrettier, // may want to disable this if it becomes annoying during development
  /** ours */
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/restrict-template-expressions": "off",
      "import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
      // NOTE: you may want to switch this one off
      "no-warning-comments": ["warn", { terms: ["todo", "__temporary__"] }],
    },
  },
);

export default config;
