import { parse } from "react-docgen-typescript";
import type { PluginOption } from "vite";
import MagicString from "magic-string";

function toKebabCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

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
        const s = new MagicString(src);
        s.append(`typeof window !== 'undefined' && (window.__STORYBOOK_COMPONENT_DOC__ ??= new Map());`);
        componentDocs.forEach((componentDoc) =>
          s.append(
            `typeof window !== 'undefined' && (window.__STORYBOOK_COMPONENT_DOC__.set("${toKebabCase(
              componentDoc.displayName,
            )}", ${JSON.stringify(componentDoc)}));`,
          ),
        );
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true, source: id }),
        };
      }
    },
  };
}
