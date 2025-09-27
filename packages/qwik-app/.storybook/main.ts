import { StorybookConfig } from "storybook-framework-qwik";

const config: StorybookConfig = {
  addons: ["@storybook/addon-docs"],
  stories: ["../src/**/*.docs.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "storybook-framework-qwik",
  },
  staticDirs: ["../public"],
};
export default config;
