import { Meta, StoryObj } from "../../../../storybook-framework-qwik/dist";
import { within } from "@storybook/testing-library";
import { UseVisibleTaskComponent } from "./use-visible-task-component";


export default {
  title: "Visible Task Component",
  component: UseVisibleTaskComponent,
} as Meta;

export const Default: StoryObj = {
  play: ({canvasElement})=> {
    const canvas = within(canvasElement);
    console.log('doing play')
    
    expect(canvas.findByText('visible task ran? Yeslo')).toBeInTheDocument();
  }
};
