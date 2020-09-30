// vue.config.js
var path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: config => {
    config.externals = {
      AMap: "AMap"
    };
  },
  publicPath: "/",
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "assets",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: "index.html",
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    port: 8888,
    host: "0.0.0.0",
    https: false,
    open: true, // 自动打开浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "http://192.168.15.84:3400",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    } // 配置多个代理
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
  },
  css: {
    modules: false,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        }
      }
    }
  }
};
