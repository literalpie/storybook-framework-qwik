import { render as renderQwik } from '@builder.io/qwik';
// returns the Qwik component as a JSX element (</MyComponent>)
// If a story has a custom renderer, it will replace this function.
export const render = (args, context) => {
    const { component } = context;
    if (typeof component === 'function') {
        return component(args, context.name);
    }
    return component;
};
export async function renderToCanvas({ storyFn, showMain }, canvasElement) {
    const container = document.createElement('div');
    await renderQwik(container, storyFn());
    canvasElement.childNodes.forEach((c) => c.remove());
    canvasElement.append(container);
    showMain();
}
// I don't know how to do HMR stuff correctly, and Vite seems to keep referencing old files when you make a change.
// Force a reload when vite notifies of an update as a dirty temporary workaround.
const viteHotMeta = import.meta.hot;
if (viteHotMeta) {
    viteHotMeta.on('vite:afterUpdate', () => {
        document.location.reload();
    });
}
