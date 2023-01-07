import { component$ } from '@builder.io/qwik';

export type ReactiveComponentProps = { state: { number: number } };
export const ReactiveComponent = component$(({ state }: ReactiveComponentProps) => {
  return (
    <div>
      {state?.number}
      <button onClick$={() => (state !== undefined ? (state.number += 1) : void 0)}>
        increase
      </button>
    </div>
  );
});
