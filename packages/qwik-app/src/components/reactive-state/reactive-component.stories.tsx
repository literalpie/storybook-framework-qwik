import {
  ReactiveComponent,
  ReactiveComponentProps,
} from "./reactive-component";
import { Meta, StoryObj } from "../../../../storybook-framework-qwik/dist";
import { component$, useStore } from "@builder.io/qwik";
import { within, userEvent, waitFor } from "@storybook/testing-library";

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
export const Args: StoryObj<ReactiveComponentProps> = {
  args: { state: { number: 7 } },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    waitFor(() => {
      canvas.getByText("7");
    });
  },
};
export const Incremented: StoryObj<ReactiveComponentProps> = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    userEvent.click(button);
    // expect doesn't work, but 'get' functions will throw an error if it doesn't exist, so just do that
    waitFor(() => {
      canvas.getByText("2");
    });
  },
};
