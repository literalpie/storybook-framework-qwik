# Storybook Framework Qwik

This is a framework to allow using [Storybook](https://storybook.js.org/) with [Qwik](https://qwik.builder.io/).

## Limitations

- This has only been tested with a brand new Qwik application project (not tested with a component library, or without qwik-city)
- Stories do not update when component is changed
- There is no automation yet for easily scaffolding storybook in a Qwik project.


## Getting started
* In an existing Qwik project, run `npx storybook@next init --type html --parser tsx` (Storybook 7 is required)
* install this package with `npm install storybook-framework-qwik -D`
* Tell storybook to use this package by adding it to main.js

```
module.exports = {
  stories: [...],
  addons: [...],
  framework: {
    name: "storybook-framework-qwik",
  },
  docs: {...},
};

```
* A stories folder with incompatible HTML stories will be created by the first step. Remove them, or replace them with Qwik stories:
```
import Header from "./header";

export default {
  title: "Story Example",
  component: () => <Header />,
};

export const Default = {};
```
* If desired, import global app styles in `preview.js`: `import "../src/global.css";`
