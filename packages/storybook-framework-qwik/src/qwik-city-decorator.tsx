import { QwikRouterMockProvider } from "@qwik.dev/router";
import { Decorator } from "./types.js";

/** Wraps story in QwikRouterMockProvider */
export const qwikCityDecorator: Decorator = (Story, { parameters }) => (
  <QwikRouterMockProvider {...parameters.qwikCity}>
    {Story()}
  </QwikRouterMockProvider>
);
