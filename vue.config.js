module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target: "https://med-share.ryspekov.life",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
