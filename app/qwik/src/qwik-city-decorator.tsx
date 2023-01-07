import { JSXNode } from '@builder.io/qwik';
import { QwikCityMockProvider } from '@builder.io/qwik-city';
import { Decorator } from './types.js';

/** Wraps story in QwikCityMockProvider */
export const qwikCityDecorator: Decorator = (Story) =>
  // Something is out of sync with the JSXNode generated here and the type expected by Decorator
  (<QwikCityMockProvider>{Story()}</QwikCityMockProvider>) as JSXNode;
