import { component$, useSignal } from "@builder.io/qwik";

export const UseVisibleTaskComponent = component$(()=>{
    const visibleTaskRan = useSignal(false);
    return <>visible task ran? {visibleTaskRan ? 'Yes' : 'No'}</>
})