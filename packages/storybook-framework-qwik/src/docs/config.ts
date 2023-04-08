import type { FunctionComponent } from '@builder.io/qwik';
import type { StrictArgTypes } from '@storybook/types';
import { enhanceArgTypes, convert } from '@storybook/docs-tools';
import { ComponentDoc } from 'react-docgen-typescript';

function getComponentName(component: FunctionComponent): string {
  if (component.name === "QwikComponent") return component({}, "", 0).props["q:renderFn"].dev.displayName.replace("_component", "");
  return component.name;
}

function getComponentDoc(component: FunctionComponent): ComponentDoc {
  const displayName = getComponentName(component);
  return window.__STORYBOOK_COMPONENT_DOC__.get(displayName);
}

function extractComponentDescription(component: FunctionComponent): string {
  return getComponentDoc(component)?.description;
}

function extractArgTypes(component: FunctionComponent): StrictArgTypes {
  const componentDoc = getComponentDoc(component);
  if (!componentDoc) return undefined;
  const strictArgTypes: StrictArgTypes = {};
  Object.entries(componentDoc.props).forEach(([key, value]) => {
    strictArgTypes[key] = {
      ...value,
      type: {
        required: value.required,
        ...convert(value)
      },
      table: {
        type: {
          summary: value.type.name,
          required: value.required,
        },
        defaultValue: {
          summary: value.defaultValue?.value,
        }
      }
    }
  })
  return strictArgTypes;
}

export const parameters = {
  docs: {
    story: { inline: true },
    extractArgTypes,
    extractComponentDescription,
  },
};

export const argTypesEnhancers = [enhanceArgTypes];