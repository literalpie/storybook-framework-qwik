import { FunctionComponent } from "@builder.io/qwik";
import { Args } from "./types.js";

export const componentToJSX = (Component: FunctionComponent, args: Args) => {
  return <Component {...args} />;
};
