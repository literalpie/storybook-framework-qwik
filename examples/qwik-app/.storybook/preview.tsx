import { qwikCityDecorator } from 'storybook-framework-qwik/qwik-city-decorator';
export const decorators = [qwikCityDecorator];
export const parameters = {
  a11y: {
    config: {},
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  options: {
    showRoots: true,
  },
  docs: {
    iframeHeight: '200px',
  },
};

import '../src/global.css';
