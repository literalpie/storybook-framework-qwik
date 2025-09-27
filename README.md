# Storybook Framework Qwik

This is a framework to allow using [Storybook](https://storybook.js.org/) with [Qwik](https://qwik.builder.io/).

## Limitations

- This has only been tested with brand new Qwik applications and component libraries.
- Story is completely reloaded when component is changed (no hot module replacement)
- There is no automation yet for easily scaffolding storybook in a Qwik project.
- Stories are run in dev mode - no SSR, or serialization happens

## Setup
<!-- test -->
In an existing Qwik project, run `npx storybook@next init` (Storybook 7 is required)

See the [Storybook Docs](https://storybook.js.org/docs/7.0/qwik/get-started/introduction) for the best documentation on getting started with Storybook.

## Usage

A basic story will look like this:

```tsx
import Header, { HeaderProps } from "./header";
import { StoryObj } from "storybook-framework-qwik";

export default {
  title: "Header",
  component: Header, // component value may be a `component$`, or a "Lite component" (function component)
} as Meta<HeaderProps>;

export const Default: StoryObj<HeaderProps> = {};
```

You can include a custom renderer for each Meta, or for each story. However, the renderer cannot use Qwik features (such as `useStore`). If you need Qwik features in the story, make a wrapper for the component. This is useful when a component expects its props to be reactive state (such as `useStore` or `useSignal`)

```tsx
import {
  ReactiveComponent,
  ReactiveComponentProps,
} from "./reactive-component";
import { Meta, StoryObj } from "storybook-framework-qwik";
import { component$, useStore } from "@builder.io/qwik";

const ReactiveComponentWrapper = component$<ReactiveComponentProps>((args) => {
  const state = useStore(args.state);
  return <ReactiveComponent state={state} />;
});

export default {
  title: "Reactive Component",
  component: ReactiveComponent,
  render: (args) => <ReactiveComponentWrapper state={args.state} />,
  args: { state: { number: 1 } },
} as Meta<ReactiveComponentProps>;

export const Default: StoryObj<ReactiveComponentProps> = {};
```

## Decorators

To make a story decorator, create a function that returns JSX, including the StoryFn passed to the decorator as a parameter

```tsx
import { JSXNode } from "@builder.io/qwik";
import { MyComponent } from "./my-component";
import { Decorator } from "storybook-framework-qwik";

export const myDecorator: Decorator = (Story) =>
  // Cast is needed because something is out of sync with the JSXNode generated in tsx files and the type expected by Decorator
  (<MyComponent>{Story()}</MyComponent>) as JSXNode;
```

## Qwik City

If using QwikCity features in your components, you may want to import the qwikCityDecorator, which wraps stories in `MockQwikCityProvider`. This can be added to all stories by exporting the decorator in a decorators array in `.storybook/preview.ts`:

```ts
import { qwikCityDecorator } from "storybook-framework-qwik/qwik-city-decorator";
export const decorators = [qwikCityDecorator];
```

You can also add the decorator to individual stories or story files.

Because this framework is shipped only as an ESM module, this may require that you add `"type": "module"` to your `package.json` (or create a package.json inside your .storybook folder to only make this setting apply to storybook).

## Troubleshooting

If you are using `MDX` files and get an error like:

`Failed to resolve import "react/jsx-dev-runtime" `

you may need to install `react` as a dev dependency.

## Demo

There is a simple example Storybook using the latest version of this package [here](https://storybook-framework-qwik.vercel.app/)

## Credit

Many parts of this package are based on code that I got from [this PR](https://github.com/BuilderIO/qwik/pull/2381), which got some ideas from [this discussion](https://github.com/BuilderIO/qwik/discussions/787).
