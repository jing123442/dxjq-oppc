const path = require('path')
module.exports = {
  publicPath: './',
  devServer: {
    port: 8118,
    open: true,
    proxy: {
      '/api': {
        target: 'https://tapi.auyen.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 })) // 配置图片Base64编码的阀值
    config.resolve.alias
      .set('@', path.join(__dirname, './src'))
  }
}
