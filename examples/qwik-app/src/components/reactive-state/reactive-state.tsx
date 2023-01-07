import { component$ } from '@builder.io/qwik';

export const StateComponent = component$(({ numberState }: { numberState: { number: number } }) => {
  return (
    <div>
      {numberState?.number}
      <button onClick$={() => (numberState !== undefined ? (numberState.number += 1) : void 0)}>
        increase
      </button>
    </div>
  );
});
