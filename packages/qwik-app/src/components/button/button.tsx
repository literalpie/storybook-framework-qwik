import type { QRL } from "@qwik.dev/core";
import { component$ } from "@qwik.dev/core";

export interface ButtonProps {
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick$?: QRL<onClickEvent> | undefined;
}

export type onClickEvent = (event: MouseEvent, element: Element) => void;

export const Button = component$<ButtonProps>(
  ({ label = "click me!", onClick$ }) => {
    return <button onClick$={onClick$}>{label}</button>;
  },
);
