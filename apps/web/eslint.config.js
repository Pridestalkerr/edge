import { base } from "@edge-placeholder/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(...base, {
  // this shouldnt be necessary, but vscode-eslint is broken 💀
  ignores: ["eslint.config.js"],
});
