import type { StorybookConfig } from '@storybook/builder-vite';

export const core: StorybookConfig['core'] = {
  builder: '@storybook/builder-vite',
  renderer: '@storybook/html',
};