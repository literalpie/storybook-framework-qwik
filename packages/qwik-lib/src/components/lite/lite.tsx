export interface LiteProps {
  prop: string;
}

/** Lite component */
export const Lite = ({ prop = "default" }: LiteProps) => {
  return (
    <div>Lite: {prop}</div>
  )
}