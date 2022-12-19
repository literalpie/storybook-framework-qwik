import { render as renderQwik } from '@builder.io/qwik';
import { jsx as _jsx } from '@builder.io/qwik/jsx-runtime';
import { ArgsStoryFn, RenderContext, WebRenderer } from '@storybook/types';
import { QwikRender } from './types.js';

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
