import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { ButtonProps } from "./button";
import { Button } from "./button";
import { $ } from "@builder.io/qwik";

const meta = {
  title: "Button",
  args: {
    onClick$: $(() => {})
  },
  argTypes: {
    onClick$: { action: "onClick" },
  },
  component: Button,
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {};
