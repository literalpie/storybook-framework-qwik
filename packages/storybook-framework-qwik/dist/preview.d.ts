import { ArgsStoryFn, RenderContext } from '@storybook/types';
import { QwikRenderer } from './types.js';
export declare const render: ArgsStoryFn<QwikRenderer<unknown>>;
export declare function renderToCanvas<T>({ storyFn, showMain }: RenderContext<QwikRenderer<T>>, canvasElement: QwikRenderer<T>['canvasElement']): Promise<void>;
