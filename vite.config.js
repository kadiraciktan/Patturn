import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";
export default {
  base: "./",

  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      name: "patturn",
      fileName: (format) => `patturn.js`,
    },
    assetsDir: "src/assets",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets",
          dest: "src/",
        },
      ],
    }),
  ],
};
