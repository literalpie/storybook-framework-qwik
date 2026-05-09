import { component$, useSignal, useVisibleTask$ } from "@qwik.dev/core";

export const UseVisibleTaskComponent = component$(() => {
  const visibleTaskRan = useSignal(false);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    () => {
      // eslint-disable-next-line qwik/valid-lexical-scope
      visibleTaskRan.value = true;
    },
    { strategy: "document-ready" },
  );
  return <>visible task ran? {visibleTaskRan.value ? "Yes" : "No"}</>;
});
