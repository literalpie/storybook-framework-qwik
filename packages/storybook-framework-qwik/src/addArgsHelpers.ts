// This file is entirely copied from @storybook/addon-actions (changing the action import)

import type { Args, Renderer, ArgsEnhancer } from "@storybook/types";
import { action } from "@storybook/addon-actions";

const isInInitialArgs = (name: string, initialArgs: Args) =>
  typeof initialArgs[name] === "undefined" && !(name in initialArgs);

/**
 * Automatically add action args for argTypes whose name
 * matches a regex, such as `^on.*` for react-style `onClick` etc.
 */

export const inferActionsFromArgTypesRegex: ArgsEnhancer<Renderer> = (
  context,
) => {
  const {
    initialArgs,
    argTypes,
    parameters: { actions },
  } = context;
  if (!actions || actions.disable || !actions.argTypesRegex || !argTypes) {
    return {};
  }

  const argTypesRegex = new RegExp(actions.argTypesRegex);
  const argTypesMatchingRegex = Object.entries(argTypes).filter(
    ([name]) => !!argTypesRegex.test(name),
  );

  return argTypesMatchingRegex.reduce((acc, [name, argType]) => {
    if (isInInitialArgs(name, initialArgs)) {
      acc[name] = action(name);
    }
    return acc;
  }, {} as Args);
};

/**
 * Add action args for list of strings.
 */
export const addActionsFromArgTypes: ArgsEnhancer<Renderer> = (context) => {
  const {
    initialArgs,
    argTypes,
    parameters: { actions },
  } = context;
  if (actions?.disable || !argTypes) {
    return {};
  }

  const argTypesWithAction = Object.entries(argTypes).filter(
    ([name, argType]) => !!argType["action"],
  );

  return argTypesWithAction.reduce((acc, [name, argType]) => {
    if (isInInitialArgs(name, initialArgs)) {
      acc[name] = action(
        typeof argType["action"] === "string" ? argType["action"] : name,
      );
    }
    return acc;
  }, {} as Args);
};
