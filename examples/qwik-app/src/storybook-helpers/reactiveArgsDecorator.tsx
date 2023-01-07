import {
  component$,
  NoSerialize,
  useStore,
  useSignal,
  useTask$,
  noSerialize,
} from '@builder.io/qwik';
import { Decorator } from 'storybook-framework-qwik';

export const QwikStory = component$(
  ({
    StoryComponent,
    args,
    onStoreChange,
    reactiveArg,
  }: {
    // ideally, this would be a generic and args would be forced to be compatible with the component
    StoryComponent: any;
    args: any;
    onStoreChange?: NoSerialize<(a: any) => void>;
    reactiveArg: string; // the name of the arg that should be put in a store so it can be tracked reactively.
  }) => {
    const myStoreChange = onStoreChange;
    const numberStateStore = useStore(
      { [reactiveArg]: args[reactiveArg] },
      {
        recursive: true,
      }
    );
    const firstUpdate = useSignal(true);
    useTask$(({ track }) => {
      track(numberStateStore[reactiveArg]);
      if (!firstUpdate.value) {
        myStoreChange?.(numberStateStore);
      } else {
        firstUpdate.value = false;
      }
    });
    return <StoryComponent args={numberStateStore} />;
  }
);

export const reactiveArgDecorator: (reactiveArg: string) => Decorator =
  (reactiveArg) => (StoryFn, context) => {
    return (
      <QwikStory
        StoryComponent={noSerialize(StoryFn)}
        args={context.args}
        reactiveArg={reactiveArg}
        onStoreChange={noSerialize((newArgs) => {
          // maybe could hook into actions here
          console.log('on store change', newArgs);
        })}
      />
    );
  };
