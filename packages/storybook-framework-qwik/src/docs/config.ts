import type { ArgTypesEnhancer, StrictArgTypes } from "@storybook/types";
import { enhanceArgTypes, convert } from "@storybook/docs-tools";
import { ComponentDoc } from "react-docgen-typescript";

function getComponentId(): string {
  return window.__STORYBOOK_PREVIEW__?.currentRender?.story?.componentId;
}

function getComponentDoc(): ComponentDoc {
  const componentId = getComponentId();
  return window.__STORYBOOK_COMPONENT_DOC__?.get(componentId);
}

function extractComponentDescription(): string {
  return getComponentDoc()?.description;
}

function extractArgTypes(): StrictArgTypes {
  const componentDoc = getComponentDoc();
  if (!componentDoc) return undefined;
  const strictArgTypes: StrictArgTypes = {};
  Object.entries(componentDoc.props).forEach(([key, value]) => {
    strictArgTypes[key] = {
      ...value,
      type: {
        required: value.required,
        ...convert(value),
      },
      table: {
        type: {
          summary: value.type.name,
          required: value.required,
        },
        defaultValue: {
          summary: value.defaultValue?.value,
        },
      },
    };
  });
  return strictArgTypes;
}

export const parameters = {
  docs: {
    story: { inline: true },
    extractArgTypes,
    extractComponentDescription,
  },
};

export const argTypesEnhancers: ArgTypesEnhancer[] = [enhanceArgTypes];
