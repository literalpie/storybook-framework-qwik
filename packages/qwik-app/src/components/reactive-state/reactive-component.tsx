import { component$ } from "@qwik.dev/core";

export type ReactiveComponentProps = { state: { count: number } };
export const ReactiveComponent = component$(
  ({ state }: ReactiveComponentProps) => {
    return (
      <div>
        {state?.count}
        <button
          onClick$={() => (state !== undefined ? (state.count += 1) : void 0)}
        >
          increase
        </button>
      </div>
    );
  },
);
