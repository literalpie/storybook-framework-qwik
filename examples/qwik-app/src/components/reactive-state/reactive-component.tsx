import { component$, Signal } from '@builder.io/qwik';

export type ReactiveComponentProps = { state: Signal<number> };
export const ReactiveComponent = component$(({ state }: ReactiveComponentProps) => {
  return (
    <div>
      {state?.value}
      <button onClick$={() => (state !== undefined ? (state.value += 1) : void 0)}>increase</button>
    </div>
  );
});
