import { parse } from "react-docgen-typescript";
import type { PluginOption } from 'vite';
import { createFilter } from 'vite';
import MagicString from 'magic-string';

export function qwikDocgen(): PluginOption {
    // Naive way to include files containing Qwik component (by excluding stories).
    // Will not work with files named 'story' or something else.
    const isComponent = /^(?!.*\.stories\.tsx$).*\.tsx$/;
  
    return {
      name: 'storybook:qwik-docgen-plugin',
      async transform(src, id) {
        if (createFilter(isComponent)(id)) {
          const metaData = parse(id, {
            propFilter: {
              // Ignore Qwik internal props
              skipPropsWithName: ["key", "q:slot"]
            }
          });
          
          const metaSource = JSON.stringify(metaData);
  
          const s = new MagicString.default(src);
  
          // Storying the component docs as a window property so we can reference it later while rendering the story.
          // Using the same implementation as official Vue docgen plugin: https://github.com/storybookjs/storybook/blob/next/code/frameworks/vue-vite/src/plugins/vue-docgen.ts
          s.append(`parent.window.__STORYBOOK_COMPONENT_DOC__ = ${metaSource}`);
    
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true, source: id }),
          };
        };
      },
    };
}