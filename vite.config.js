export default {
  root: "./",
  base: "./", // Bu satırı ekleyin
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
};
