import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: { globals: globals.node },
    files: ["src/**/*.js", "scripts/**/*.js"],
    ignores: [".github/*", "node_modules", "docs/", "previews/"],
    rules: {
      "handle-callback-err": "off",
      "max-nested-callbacks": ["error", { "max": 4 }],
      "no-console": "off",
      "no-empty-function": "error",
      "no-inline-comments": "error",
      "no-lonely-if": "error",
      "no-shadow": ["error", { "allow": ["err", "resolve", "reject"] }],
      "no-var": "error",
      "prefer-const": "error",
      "spaced-comment": "error",
      "yoda": "error",
    },
  },
];
