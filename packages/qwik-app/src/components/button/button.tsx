import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export interface ButtonProps {
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick$?: PropFunction<onClickEvent> | undefined;
}

export type onClickEvent = (event: MouseEvent, element: Element) => void;

export const Button = component$<ButtonProps>(
  ({ label = "click me!", onClick$ }) => {
    return <button onClick$={onClick$}>{label}</button>;
  },
);
