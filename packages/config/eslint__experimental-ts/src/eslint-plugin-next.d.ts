declare module "@next/eslint-plugin-next" {
  import type { ESLint } from "eslint";
  const plugin: Omit<ESLint.Plugin, "configs"> & {
    // @next/eslint-plugin-next does not use FlatConfig yet
    configs: Record<string, ESLint.ConfigData>;
  };
  export default plugin;
}
