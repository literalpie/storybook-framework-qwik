import { Header, HeaderProps } from "./header";
import { Meta, StoryObj } from "storybook-framework-qwik";

export default {
  title: "Story Example",
  component: Header,
  args: {},
  tags: ["docsPage"],
  parameters: {
    qwikCity: {
      url: "http://example.com"
    }
  },
} as Meta<HeaderProps>;

export const Default: StoryObj<HeaderProps> = {};
export const WithTitle: StoryObj<HeaderProps> = {
  args: { title: "Test Title" },
  parameters: {
    qwikCity: {
      url: "http://qwik.dev"
    }
  }
};
