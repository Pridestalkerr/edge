/**
 * Workaround for broken types in eslint-plugin-react-hooks.
 * @see https://github.com/facebook/react/issues/30119
 * @see https://github.com/facebook/react/pull/30774
 */
declare module "eslint-plugin-react-hooks" {
  import type { ESLint } from "eslint";
  const plugin: Omit<ESLint.Plugin, "configs"> & {
    // eslint-plugin-react-hooks does not use FlatConfig yet
    configs: Record<string, ESLint.ConfigData>;
  };
  export default plugin;
}
