import { Meta, StoryObj } from 'storybook-framework-qwik/*';
import { reactiveArgDecorator } from '~/storybook-helpers/reactiveArgsDecorator';
import { StateComponent } from './reactive-state';

export default {
  title: 'Reactive State',
  component: StateComponent,
  decorators: [reactiveArgDecorator('numberState')],
} as Meta<{ numberState: { number: number } }>;

export const Default: StoryObj<{
  numberState: { number: number };
}> = {
  args: {
    numberState: { number: 1 },
  },
};
