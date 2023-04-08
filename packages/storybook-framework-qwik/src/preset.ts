import type { StorybookViteConfig } from "@storybook/builder-vite";
import { mergeConfig, Plugin } from "vite";
import { QWIK_LOADER } from "@builder.io/qwik/loader";
import { qwikDocgen } from "./docs/qwik-docgen.js";

export const core: StorybookViteConfig["core"] = {
  builder: "@storybook/builder-vite",
  renderer: "storybook-framework-qwik",
};

export const viteFinal: StorybookViteConfig["viteFinal"] = async (
  defaultConfig
) => {
  const config = mergeConfig(defaultConfig, {
    build: {
      target: "es2020",
      rollupOptions: {
        external: ["@qwik-city-plan"],
      },
    },
  });
  const storyFiles = Array.isArray(defaultConfig.optimizeDeps?.entries)
    ? defaultConfig.optimizeDeps.entries
    : [];
  if (
    !config.plugins.some(
      (plugin: Plugin) => plugin.name === "storybook:qwik-docgen-plugin"
    )
  )
    config.plugins.push(qwikDocgen(storyFiles));

  // Qwik-city plugin may be used in apps, but it has mdx stuff that conflicts with Storybook mdx
  // we'll try to only remove the transform code (where the mdx stuff is), and keep everything else.
  config.plugins = config.plugins.map((plugin: Plugin) =>
    plugin.name === "vite-plugin-qwik-city"
      ? { ...plugin, transform: () => null as any }
      : plugin
  );

  return config;
};

export const previewAnnotations: StorybookViteConfig["previewAnnotations"] = (
  entry = []
) => [...entry, require.resolve("storybook-framework-qwik/preview.js")];

export const previewHead = (head: string) => {
  return `${head} <script>${QWIK_LOADER}</script>`;
};
