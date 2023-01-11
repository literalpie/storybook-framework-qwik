import type { StorybookConfig } from '@storybook/builder-vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/*.docs.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: 'storybook-framework-qwik',
    options: { qwikCity: false },
  },
  docs: {
    docsPage: 'automatic',
  },
};
export default config;
