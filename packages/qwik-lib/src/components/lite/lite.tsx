export interface LiteProps {
  /** Prop documentation */
  prop: string;
}

/** Lite component */
export const Lite = ({ prop = "default" }: LiteProps) => {
  return <div>Lite: {prop}</div>;
};
