import { parse } from "react-docgen-typescript";
import type { PluginOption } from "vite";
import MagicString from "magic-string";

export function qwikDocgen(
  storyFilePaths: Array<string> | undefined
): PluginOption {
  return {
    name: "storybook:qwik-docgen-plugin",
    async transform(src, id) {
      const isComponent =
        id.endsWith(".tsx") &&
        !storyFilePaths.some((storyFilePath) => id.endsWith(storyFilePath));
      if (isComponent) {
        const componentDocs = parse(id, {
          propFilter: {
            // Ignore Qwik internal props
            skipPropsWithName: ["key", "q:slot"],
          },
        });
        const s = new MagicString.default(src);
        s.append(`window.__STORYBOOK_COMPONENT_DOC__ ??= new Map();`);
        componentDocs.forEach((componentDoc) =>
          s.append(
            `window.__STORYBOOK_COMPONENT_DOC__.set("${
              componentDoc.displayName
            }", ${JSON.stringify(componentDoc)});`
          )
        );
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true, source: id }),
        };
      }
    },
  };
}
