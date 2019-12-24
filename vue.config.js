/*
 * @Author: your name
 * @Date: 2019-12-20 10:01:33
 * @LastEditTime : 2019-12-20 10:42:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-show\vue.config.js
 */
const path = require('path')
const resolve = function(dir) {
  console.log(path.join(__dirname, dir))
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourceMap
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@views', resolve('src/views'))
      .set('@components', resolve('src/components'))
    config.optimization.runtimeChunk('single')
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true,
    open: true,
    inline: true,
    // 在浏览器上全屏显示编译的errors或warnings。
    overlay: {
      warning: true,
      error: true
    },
    proxy: {
      '/apis': {
        target: 'http://127.0.0.1:8000/', // 接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/apis': '' // 需要rewrite的,
        }
      }
    }

  }
}
