import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vite";
import { pluginExposeRenderer } from "./vite.base.config";

import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"renderer">;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? "";

  return {
    root,
    mode,
    base: "./",
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [pluginExposeRenderer(name), vue()],
    resolve: {
      preserveSymlinks: true,
      alias: {
        "@": resolve(__dirname, "../src"),
        "~@": resolve(__dirname, "../src"),
      },
      extensions: [".mjs", ".js", ".tsx", ".json", ".sass", ".scss", ".ts"],
    },
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
    clearScreen: false,
  } as UserConfig;
});
