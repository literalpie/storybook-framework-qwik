import type { StorybookViteConfig } from '@storybook/builder-vite';
import { mergeConfig } from 'vite';
import { QWIK_LOADER } from '@builder.io/qwik/loader';

export const core: StorybookViteConfig['core'] = {
  builder: '@storybook/builder-vite',
  renderer: 'storybook-framework-qwik',
};

export const viteFinal: StorybookViteConfig['viteFinal'] = async (defaultConfig, options) => {
  const config = mergeConfig(defaultConfig, {
    build: {
      target: 'es2020',
      rollupOptions: {
        external: ['@qwik-city-plan'],
      },
    },
  });
  // Qwik-city plugin may be used in apps, but it has mdx stuff that conflicts with Storybook mdx
  // we'll try to only remove the transform code (where the mdx stuff is), and keep everything else.
  config.plugins = config.plugins.map((plugin: any) =>
    plugin.name === 'vite-plugin-qwik-city' ? { ...plugin, transform: () => null as any } : plugin
  );
  return config;
};

export const previewAnnotations: StorybookViteConfig['previewAnnotations'] = (entry = []) => [
  ...entry,
  require.resolve('storybook-framework-qwik/preview.js'),
];

export const previewHead = (head: string) => {
  return `${head} <script>${QWIK_LOADER}</script>`;
};
