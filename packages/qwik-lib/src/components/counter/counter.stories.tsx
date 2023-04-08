import { Meta, StoryObj } from '../../../../storybook-framework-qwik/dist';
import { Lite } from '../lite/lite';
import { Counter, CounterProps } from './counter';

export default {
  title: 'Counter',
  component: Counter,
  tags: ['autodocs'],
} satisfies Meta<CounterProps>;

/** Test case: Should display this documentation */
export const Standard: StoryObj<CounterProps> = {};

/** Test case: Should be able to render multiple components in same story */
export const Render: StoryObj<CounterProps> = {
  render: (args) => {
    return (
      <>
        <Lite prop="Hello" />
        <Counter {...args} />
      </>
    );
  },
};
