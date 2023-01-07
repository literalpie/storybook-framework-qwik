import { ReactiveComponent, ReactiveComponentProps } from './reactive-component';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { component$, useSignal, useStore } from '@builder.io/qwik';

const ReactiveCompnentWrapper = component$<ReactiveComponentProps>((args) => {
  const state = useSignal(1);
  return <ReactiveComponent state={state} />;
});

export default {
  title: 'Reactive Component',
  component: ReactiveComponent,
  render: (args) => <ReactiveCompnentWrapper state={args.state} />,
} as Meta<ReactiveComponentProps>;

export const Default: StoryObj<ReactiveComponentProps> = {};
