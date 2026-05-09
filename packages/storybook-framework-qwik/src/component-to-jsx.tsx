import { FunctionComponent } from "@qwik.dev/core";
import { Args } from "./types.js";

export const componentToJSX = (Component: FunctionComponent, args: Args) => {
  return <Component {...args} />;
};
