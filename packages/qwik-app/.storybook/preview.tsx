import { qwikCityDecorator } from "storybook-framework-qwik/qwik-city-decorator";
import { Decorator, Parameters } from "storybook-framework-qwik";

export const decorators: Decorator[] = [qwikCityDecorator];
export const parameters: Parameters = {
  a11y: {
    config: {},
    options: {
      checks: { "color-contrast": { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  options: {
    showRoots: true,
  },
  docs: {
    iframeHeight: "200px",
  },
};

import "../src/global.css";
