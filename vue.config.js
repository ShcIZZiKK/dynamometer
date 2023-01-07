const { defineConfig } = require("@vue/cli-service");
process.env.NODE_ENV === "production" ? "/dynamometer/" : "/",
  (module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
      svgSprite: {
        dir: "src/assets/svg",
        test: /\.(svg)(\?.*)?$/,
        loaderOptions: {
          extract: true,
          spriteFilename: "img/icons.[hash:8].svg",
        },
        pluginOptions: {
          plainSprite: true,
        },
      },
    },

    chainWebpack: (config) => {
      config.module.rule("svg-sprite").use("svgo-loader").loader("svgo-loader");
    },
  }));
