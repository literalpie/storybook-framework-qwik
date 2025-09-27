import { Meta, StoryObj } from "../../../../storybook-framework-qwik/dist";
import { within } from "storybook/test";
import { UseVisibleTaskComponent } from "./use-visible-task-component";

export default {
  title: "Visible Task Component",
  component: UseVisibleTaskComponent,
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText("visible task ran? Yes");
  },
};
