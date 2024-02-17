import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const UseVisibleTaskComponent = component$(() => {
  const visibleTaskRan = useSignal(false);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    visibleTaskRan.value = true;
  });
  return <>visible task ran? {visibleTaskRan.value ? "Yes" : "No"}</>;
});
