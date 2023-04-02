import { render as renderQwik } from '@builder.io/qwik';
import { ArgsStoryFn, RenderContext } from '@storybook/types';
import { QwikRenderer } from './types.js';
export { parameters, argTypesEnhancers } from "./docs/config.js"

// returns the Qwik component as a JSX element (</MyComponent>)
// If a story has a custom renderer, it will replace this function.
export const render: ArgsStoryFn<QwikRenderer<unknown>> = (args, context) => {
  const { component } = context;
  if (typeof component === 'function') {
    // NEEDS REVIEW: When using 'componentToJSX' the component prop values will not update when value is changed
    // inside the Storybook controls so I changed it back to the original and ensured a flag value is passed to function.
    // I'm not sure exactly what 'flags' are but have not detected any changes in behavior after this change.
    return component(args, context.name, 0);
  }
  return component;
};

export async function renderToCanvas<T>(
  { storyFn, showMain }: RenderContext<QwikRenderer<T>>,
  canvasElement: QwikRenderer<T>['canvasElement']
) {
  const container = document.createElement('div');
  await renderQwik(container, storyFn());
  canvasElement.childNodes.forEach((c) => c.remove());
  canvasElement.append(container);

  showMain();
}

// I don't know how to do HMR stuff correctly, and Vite seems to keep referencing old files when you make a change.
// Force a reload when vite notifies of an update as a dirty temporary workaround.
const viteHotMeta: any = (import.meta as any).hot;
if (viteHotMeta) {
  viteHotMeta.on('vite:afterUpdate', () => {
    document.location.reload();
  });
}