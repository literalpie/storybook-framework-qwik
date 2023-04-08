import { Lite as AliasLite } from './lite';

export default {
  title: 'Lite',
  component: AliasLite,
  tags: ['autodocs'],
};

/** Test case: Override default value */
export const Standard = {
  args: {
    prop: 'Non-default',
  },
};

/** Test case: Story with the same name as it's component */
export const Lite = {};
