import { Header, HeaderProps } from "./header";
import { Meta, StoryObj } from "../../../../storybook-framework-qwik/dist";

export default {
  title: "Story Example",
  component: Header,
  args: {},
  tags: ["docsPage"],
} as Meta<HeaderProps>;

export const Default: StoryObj<HeaderProps> = {};
export const WithTitle: StoryObj<HeaderProps> = {
  args: { title: "Test Title" },
};
