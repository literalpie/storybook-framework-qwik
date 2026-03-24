import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { qwikEslint9Plugin } from "eslint-plugin-qwik";
import storybook from "eslint-plugin-storybook";

export default tseslint.config(
  {
    ignores: [
      "**/*.log",
      "**/.DS_Store",
      ".vscode/settings.json",
      ".history",
      ".yarn",
      "bazel-*",
      "bazel-bin",
      "bazel-out",
      "bazel-qwik",
      "bazel-testlogs",
      "dist",
      "dist-dev",
      "lib",
      "lib-types",
      "etc",
      "external",
      "**/node_modules/**",
      "temp",
      "tsc-out",
      "tsdoc-metadata.json",
      "target",
      "output",
      "rollup.config.js",
      "build",
      ".cache",
      ".vscode",
      ".rollup.cache",
      "tsconfig.tsbuildinfo",
      "vite.config.ts",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...qwikEslint9Plugin.configs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "prefer-spread": "off",
      "no-case-declarations": "off",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
    },
  },
);
