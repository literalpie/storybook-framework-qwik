# Contributing

PRs welcome, Contributions appreciated, blah blah blah.

I would especially appreciate contributions to issues marked "help wanted" or "high priority".

Comment on an issue if you would like any information or help! I'm happy to chat, or even do a short video call if it is helpful to pair on something. I'm also available in the Qwik and Storybook Discords, `@literalpie`.

## Building and Testing

At the root of the repo, run `yarn workspace storybook-framework-qwik build` to build the actual package once, or `yarn workspace storybook-framework-qwik watch` to build in watch mode.

`yarn watch` at the workspace level will build and watch the library.
`yarn dev` will watch the library, and also build/launch the qwik-app storybook.

After making changes, please run `yarn test`. We don't have CI yet 🙈.
