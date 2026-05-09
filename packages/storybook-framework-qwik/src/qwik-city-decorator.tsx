import { QwikRouterMockProvider} from "@qwik.dev/router";
import { Decorator } from "./types.js";

/** Wraps story in QwikRouterMockProvider */
export const qwikCityDecorator: Decorator = (Story) => (
  <QwikRouterMockProvider>{Story()}</QwikRouterMockProvider>
);
