import { ReactiveComponent, ReactiveComponentProps } from './reactive-component';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { component$, useStore } from '@builder.io/qwik';

const ReactiveComponentWrapper = component$<ReactiveComponentProps>((args) => {
  const state = useStore(args.state);
  return <ReactiveComponent state={state} />;
});

export default {
  title: 'Reactive Component',
  component: ReactiveComponent,
  render: (args) => <ReactiveComponentWrapper state={args.state} />,
  args: { state: { number: 1 } },
} as Meta<ReactiveComponentProps>;

export const Default: StoryObj<ReactiveComponentProps> = {};
