import { inlinedQrl, render as renderQwik } from "@builder.io/qwik";
import { ArgsEnhancer, ArgsStoryFn, RenderContext } from "storybook/internal/types";
import { QwikRenderer } from "./types.js";
import { componentToJSX } from "./component-to-jsx.js";
import {
  addActionsFromArgTypes,
  inferActionsFromArgTypesRegex,
} from "./addArgsHelpers.js";
export { parameters, argTypesEnhancers } from "./docs/config.js";

// returns the Qwik component as a JSX element (</MyComponent>)
// If a story has a custom renderer, it will replace this function.
export const render: ArgsStoryFn<QwikRenderer<unknown>> = (args, context) => {
  const { component } = context;
  if (typeof component === "function") {
    return componentToJSX(component, args);
  }
  return component;
};

export async function renderToCanvas<T>(
  { storyFn, showMain }: RenderContext<QwikRenderer<T>>,
  canvasElement: QwikRenderer<T>["canvasElement"],
) {
  const container = document.createElement("div");
  canvasElement.childNodes.forEach((c) => c.remove());
  canvasElement.append(container);
  await renderQwik(container, storyFn());
  showMain();
}

// I don't know how to do HMR stuff correctly, and Vite seems to keep referencing old files when you make a change.
// Force a reload when vite notifies of an update as a dirty temporary workaround.
const viteHotMeta: any = (import.meta as any).hot;
if (viteHotMeta) {
  viteHotMeta.on("vite:afterUpdate", () => {
    document.location.reload();
  });
}

const actionsArgsEnhancers: ArgsEnhancer[] = [
  addActionsFromArgTypes,
  inferActionsFromArgTypesRegex,
];

export const argsEnhancers: ArgsEnhancer[] =
  // use the argsEnhancers from addon-actions, then wrap the actions in Qwik's inlinedQrl function so things work.
  actionsArgsEnhancers.map((actionsEnhancer: ArgsEnhancer) => {
    return ((context) => {
      const argsWithActions = actionsEnhancer(context);
      let finalArgs: any = {};
      Object.keys(argsWithActions).forEach((key) => {
        finalArgs[key] = inlinedQrl(argsWithActions[key], key);
      });
      return finalArgs;
    }) as ArgsEnhancer;
  });
