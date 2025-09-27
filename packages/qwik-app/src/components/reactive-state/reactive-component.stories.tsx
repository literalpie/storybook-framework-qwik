import {
  ReactiveComponent,
  ReactiveComponentProps,
} from "./reactive-component";
import { Meta, StoryObj } from "../../../../storybook-framework-qwik/dist";
import { component$, useStore } from "@builder.io/qwik";
import { within, userEvent } from "storybook/test";

const ReactiveComponentWrapper = component$<ReactiveComponentProps>((args) => {
  const state = useStore(args.state);

  return <ReactiveComponent state={state} />;
});

export default {
  title: "Reactive Component",
  component: ReactiveComponent,
  render: (args) => <ReactiveComponentWrapper state={args.state} />,
  args: { state: { count: 1 } },
} as Meta<ReactiveComponentProps>;

// Note: it seems like this fails when testing locally (props are immutable), but passes in CI.
// Not sure which one is correct.
// The goal is for this component to only mutate a store, which is shown in Qwik docs
export const Default: StoryObj<ReactiveComponentProps> = {};
export const Args: StoryObj<ReactiveComponentProps> = {
  args: { state: { count: 7 } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("7");
  },
};
export const Incremented: StoryObj<ReactiveComponentProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    userEvent.click(button);
    // expect doesn't work, but 'get' functions will throw an error if it doesn't exist, so just do that
    await canvas.findByText("2");
  },
};
