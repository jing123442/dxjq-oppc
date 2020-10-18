module.exports = {
  publicPath: './',
  devServer: {
    port: 8888,
    open: true,
    proxy: {
      '/api': {
        target: 'https://dapi.auyen.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  transpileDependencies: ['element-china-area-data'],
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 })) // 配置图片Base64编码的阀值
  }
}
