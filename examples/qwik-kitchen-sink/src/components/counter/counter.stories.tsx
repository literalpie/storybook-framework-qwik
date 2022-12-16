import type { StoryObj, Meta } from '@storybook/html';
import { Counter } from './counter';

// More on how to set up stories at: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<any> = {
  title: 'Qwik/Button',
  // component: Counter as any,
  render: (args) => {
    console.log('render', args);
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return <Counter/>;
  }
};

export default meta;
type Story = StoryObj<any>;

export const Primary: Story = {};
