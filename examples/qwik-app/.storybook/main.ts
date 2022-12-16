import type { StorybookConfig } from '@storybook/builder-vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: 'storybook-framework-qwik',
};
export default config;
