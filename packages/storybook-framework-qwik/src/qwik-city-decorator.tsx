import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { Decorator } from "./types.js";

/** Wraps story in QwikCityMockProvider */
export const qwikCityDecorator: Decorator = (Story) => (
  <QwikCityMockProvider>{Story()}</QwikCityMockProvider>
);
