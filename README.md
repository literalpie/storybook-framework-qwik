# Storybook Framework Qwik

This is a framework to allow using [Storybook](https://storybook.js.org/) with [Qwik](https://qwik.builder.io/).

## Limitations

- This has only been tested with brand new Qwik applications and component libraries. This also hasn't been tested with a static build of storybook.
- Story is completely reloaded when component is changed (no hot module repacement)
- There is no automation yet for easily scaffolding storybook in a Qwik project.
- MDX stories are not supported
- Stories are run in dev mode - no SSR, or serialization happens

## Setup

- In an existing Qwik project, run `npx storybook@next init --type html --parser ts` (Storybook 7 is required)
- install this package with `npm install storybook-framework-qwik -D`
- Tell storybook to use this package by adding it to main.js, and prevent it from picking up unsupported mdx files by removing `*.mdx` from `stories` (See [issue #17](https://github.com/literalpie/storybook-framework-qwik/issues/17))

```
module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [...],
  framework: {
    name: "storybook-framework-qwik",
  },
  docs: {...},
};

```

- A stories folder with incompatible HTML stories will be created by the first step. Remove them, or replace them with Qwik stories (see examples below).

- If desired, import global app styles in `preview.js`: `import "../src/global.css";`

## Usage

A basic story will look like this:

```tsx
import Header, { HeaderProps } from './header';
import { StoryObj } from 'storybook-framework-qwik';

export default {
  title: 'Header',
  component: Header, // component value may be a `component$`, or a "Lite component" (function component)
} as Meta<HeaderProps>;

export const Default: StoryObj<HeaderProps> = {};
```

You can include a custom renderer for each Meta, or for each story. However, the renderer cannot use Qwik features (such as `useStore`). If you need Qwik features in the story, make a wrapper for the component. This is useful when a component expects its props to be reactive state (such as `useStore` or `useSignal`)

```tsx
import { ReactiveComponent, ReactiveComponentProps } from './reactive-component';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { component$, useStore } from '@builder.io/qwik';

const ReactiveCompnentWrapper = component$<ReactiveComponentProps>((args) => {
  const state = useStore(args.state);
  return <ReactiveComponent state={state} />;
});

export default {
  title: 'Reactive Component',
  component: ReactiveComponent,
  render: (args) => <ReactiveCompnentWrapper state={args.state} />,
} as Meta<ReactiveComponentProps>;

export const Default: StoryObj<ReactiveComponentProps> = {};
```

## Decorators

To make a story decorator, create a function that returns JSX, including the StoryFn passed to the decorator as a parameter

```tsx
import { JSXNode } from '@builder.io/qwik';
import { MyComponent } from './my-component';
import { Decorator } from 'storybook-framework-qwik';

export const myDecorator: Decorator = (Story) =>
  // Cast is needed because something is out of sync with the JSXNode generated in tsx files and the type expected by Decorator
  (<MyComponent>{Story()}</MyComponent>) as JSXNode;
```

## Qwik City

If using QwikCity features in your components, you may want to import the qwikCityDecorator, which wraps stories in `MockQwikCityProvider`. This can be added to all stories by exporting the decorator in a decorators array in `.storybook/preview.ts`:

```ts
import { qwikCityDecorator } from 'storybook-framework-qwik/qwik-city-decorator';
export const decorators = [qwikCityDecorator];
```

You can also add the decorator to individual stories or story files.

Because this framework is shipped only as an ESM module, this may require that you add `"type": "module"` to your `package.json` (or create a package.json inside your .storybook folder to only make this setting apply to storybook).

## Credit

Many parts of this package are based on code that I got from [this PR](https://github.com/BuilderIO/qwik/pull/2381), which got some ideas from [this discussion](https://github.com/BuilderIO/qwik/discussions/787).
