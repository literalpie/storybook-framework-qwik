import { Component } from '@builder.io/qwik';
import { WebRenderer } from '@storybook/types';

export interface QwikRender<T> extends WebRenderer {
  component: Component<T>;
  storyResult: ReturnType<Component<T>>;
}
