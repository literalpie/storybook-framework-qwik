const path = require('path');
const mergeConfig = require('vite').mergeConfig;

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // './qwikVite.js',
  ],
  framework: {
    name: 'storybook-framework-qwik',
    options: {},
  },
  docs: {
    docsPage: true,
  },
  viteFinal: (defaultConfig) => {
    const config = mergeConfig(defaultConfig, {
      build: {
        target: 'es2020',
        rollupOptions: {
          external: ['@qwik-city-sw-register', '@qwik-city-plan'],
        },
      },
    });
    console.log('config', config);
    return config;
  },
};
