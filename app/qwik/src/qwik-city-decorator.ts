import { Component, JSXNode } from '@builder.io/qwik';
import { StoryContext } from '@storybook/html';
import { jsx as _jsx } from '@builder.io/qwik/jsx-runtime';
import { QwikCityMockProvider } from '@builder.io/qwik-city';

/** Wraps story in QwikCityMockProvider */
export const qwikCityDecorator = async (Story: () => JSXNode, context: StoryContext) => {
  const storyNode = Story();
  // equal to <QwikCityMockProvider><Story/></QwikCityMockProvider>
  const tree = _jsx(
    QwikCityMockProvider as Component<unknown>, // avoid qwik-city types in return type
    {
      children: storyNode,
    },
    'QwikCityMockProvider'
  );
  return tree;
};
