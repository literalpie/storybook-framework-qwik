import type { StorybookConfig } from '@storybook/builder-vite';
import { mergeConfig } from 'vite';

console.log('did preset');

export const core: StorybookConfig['core'] = {
  builder: '@storybook/builder-vite',
  renderer: '@storybook/html',
};

export const viteFinal: StorybookConfig['viteFinal'] = async (defaultConfig, options) => {
  const config = mergeConfig(defaultConfig, {
    build: {
      target: 'es2020',
      rollupOptions: {
        external: ['@qwik-city-sw-register', '@qwik-city-plan'],
      },
    },
  });

  return config;
};

export const previewAnnotations: StorybookConfig['previewAnnotations'] = (entry = []) => [
  ...entry,
  // For some reason, this file does not work when added.
  // require.resolve('storybook-framework-qwik/preview.js'),
];
