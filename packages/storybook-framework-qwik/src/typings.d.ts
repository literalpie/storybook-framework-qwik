import type { ComponentDoc } from "react-docgen-typescript";

declare global {
  interface Window {
    __STORYBOOK_COMPONENT_DOC__: Map<string, ComponentDoc>;
  }
}
