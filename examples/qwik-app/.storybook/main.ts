const config = {
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/*.docs.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: 'storybook-framework-qwik',
    options: { qwikCity: false },
  },
  docs: {
    docsPage: 'automatic',
  },
  staticDirs: ['../public'],
};
export default config;
