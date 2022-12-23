import { render as renderQwik, RenderOnce } from '@builder.io/qwik';
import { jsx as _jsx } from '@builder.io/qwik/jsx-runtime';
import { ArgsStoryFn, RenderContext } from '@storybook/types';
import { QwikRenderer } from './types.js';

// returns the Qwik component as a JSX element (</MyComponent>)
// If a story has a custom renderer, it will replace this function.
export const render: ArgsStoryFn<QwikRenderer<unknown>> = (args, context) => {
  const { component } = context;
  if (typeof component === 'function') {
    return component(args, context.name);
  }

  return component;
};

export async function renderToCanvas<T>(
  { storyFn, showMain, showError }: RenderContext<QwikRenderer<T>>,
  canvasElement: QwikRenderer<T>['canvasElement']
) {
  const container = document.createElement('div');
  const tree = _jsx(storyFn, {}, 'qwik-story');
  await renderQwik(container, tree);
  canvasElement.childNodes.forEach((c) => c.remove());
  canvasElement.append(container);

  showMain();
}

// I don't know how to to HMR stuff correctly, and Vite seems to keep referencing old files when you make a change.
// Force a reload when vite notifies of an update as a dirty temporary workaround.
const viteHotMeta: any = (import.meta as any).hot;
if (viteHotMeta) {
  viteHotMeta.on('vite:afterUpdate', () => {
    document.location.reload();
  });
}
