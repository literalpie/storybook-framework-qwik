# Contributing

PRs welcome, Contributions appreciated, blah blah blah.

## Building and Testing

At the root of the repo, run `yarn workspace storybook-framework-qwik build` to build the actual package once, or `yarn workspace storybook-framework-qwik watch` to build in watch mode.

Run `yarn workspace qwik-app storybook` or `yarn workspace qwik-lib storybook` to build the respective storybooks.

All testing is done manually so far 🙈. Before releasing, I recomend testing with a real example app/library in a different repo. Bundling stuff can get messy and hard to reproduce in the same repo.
