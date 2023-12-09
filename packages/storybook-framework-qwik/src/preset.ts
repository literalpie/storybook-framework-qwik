import { mergeConfig, Plugin } from "vite";
import { QWIK_LOADER } from "@builder.io/qwik/loader";
import { qwikDocgen } from "./docs/qwik-docgen.js";
import { StorybookConfig } from "./types.js";
import { dirname, join } from "path";

const wrapForPnP = (input: string) =>
  dirname(require.resolve(join(input, "package.json")));

export const core: StorybookConfig["core"] = {
  builder: wrapForPnP("@storybook/builder-vite"),
  renderer: wrapForPnP("storybook-framework-qwik"),
};

export const viteFinal: StorybookConfig["viteFinal"] = async (
  defaultConfig,
) => {
  const config = mergeConfig(defaultConfig, {
    build: {
      target: "es2020",
      rollupOptions: {
        external: ["@qwik-city-plan"],
      },
    },
  });

  if (
    !config.plugins.some(
      (plugin: Plugin) => plugin.name === "storybook:qwik-docgen-plugin",
    )
  )
    config.plugins.push(qwikDocgen());

  // Qwik-city plugin may be used in apps, but it has mdx stuff that conflicts with Storybook mdx
  // we'll try to only remove the transform code (where the mdx stuff is), and keep everything else.
  config.plugins = config.plugins.map((plugin: Plugin) => {
    // the plugin may be standalone (Qwik <1.2), or in an array (Qwik >=1.2)
    if (Array.isArray(plugin)) {
      return plugin.map((subPlugin: Plugin) => {
        return subPlugin.name === "vite-plugin-qwik-city"
          ? { ...subPlugin, transform: () => null as any }
          : subPlugin;
      });
    }
    return plugin.name === "vite-plugin-qwik-city"
      ? { ...plugin, transform: () => null as any }
      : plugin;
  });

  return config;
};

export const previewAnnotations: StorybookConfig["previewAnnotations"] = (
  entry = [],
) => [...entry, require.resolve("storybook-framework-qwik/preview.js")];

export const previewHead = (head: string) => {
  return `${head} <script>${QWIK_LOADER}</script>`;
};
