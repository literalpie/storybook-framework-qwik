import { parse } from "react-docgen-typescript";
import type { PluginOption } from "vite";
import MagicString from "magic-string";

export function qwikDocgen(): PluginOption {
  return {
    name: "storybook:qwik-docgen-plugin",
    async transform(src, id) {
      if (id.endsWith(".tsx")) {
        const componentDocs = parse(id, {
          propFilter: {
            // Ignore Qwik framework props
            skipPropsWithName: ["key", "q:slot"],
          },
        });
        const s = new MagicString.default(src);
        s.append(`window.__STORYBOOK_COMPONENT_DOC__ ??= new Map();`);
        componentDocs.forEach((componentDoc) =>
          s.append(
            `window.__STORYBOOK_COMPONENT_DOC__.set("${componentDoc.displayName.toLowerCase()}", ${JSON.stringify(
              componentDoc
            )});`
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
