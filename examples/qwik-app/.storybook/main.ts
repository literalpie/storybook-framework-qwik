import type { StorybookConfig } from '@storybook/builder-vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: 'storybook-framework-qwik',
    options: { qwikCity: false },
  },
};
export default config;
