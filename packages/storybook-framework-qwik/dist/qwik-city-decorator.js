import { jsx as _jsx } from "@builder.io/qwik/jsx-runtime";
import { QwikCityMockProvider } from '@builder.io/qwik-city';
/** Wraps story in QwikCityMockProvider */
export const qwikCityDecorator = (Story) => (_jsx(QwikCityMockProvider, { children: Story() }));
