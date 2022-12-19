import { JSXNode, render as renderQwik } from '@builder.io/qwik';
import { QwikCityMockProvider } from '@builder.io/qwik-city';
import { jsx as _jsx } from '@builder.io/qwik/jsx-runtime';
import { StoryContext } from '@storybook/html';
import { ArgsStoryFn, RenderContext, WebRenderer } from '@storybook/types';
import global from 'global';
import { QwikRender } from './types.js';

const { FRAMEWORK_OPTIONS } = global;

/** Wraps story in QwikCityMockProvider */
const qwikCityDecorator = (Story: () => JSXNode, context: StoryContext) => {
  const storyNode = Story();
  // equal to <QwikCityMockProvider><Story/></QwikCityMockProvider>
  const tree = _jsx(
    QwikCityMockProvider,
    {
      children: storyNode,
    },
    'QwikCityMockProvider'
  );
  return tree;
};

export const decorators = FRAMEWORK_OPTIONS.qwikCity ? [qwikCityDecorator] : [];

// returns the Qwik component as a JSX element (</MyComponent>)
// If a story has a custom renderer, it will replace this function.
export const render: ArgsStoryFn<QwikRender<unknown>> = (args, context) => {
  const { component } = context;
  if (typeof component === 'function') {
    return component(args, context.name);
  }

  return component;
};

export async function renderToCanvas<T>(
  { storyFn, showMain, showError }: RenderContext<QwikRender<T>>,
  canvasElement: WebRenderer['canvasElement']
) {
  const container = document.createElement('div');
  const tree = _jsx(storyFn, {}, 'qwik-story');
  await renderQwik(container, tree);
  // If this isn't the first time rendering this story, refresh the iframe.
  // Ideally, this would use hot module replacement instead.
  if (canvasElement.childNodes.length > 0) {
    document.location.reload();
  } else {
    canvasElement.append(container);
  }

  showMain();
}
