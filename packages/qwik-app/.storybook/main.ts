import { StorybookConfig } from 'storybook-framework-qwik';

const config: StorybookConfig = {
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/*.docs.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: 'storybook-framework-qwik',
  },
  core: {
    renderer: 'storybook-framework-qwik',
  },
  docs: {
    autodocs: false,
  },
  staticDirs: ['../public'],
};
export default config;
