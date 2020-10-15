module.exports = {
  publicPath: './',
  devServer: {
    port: 8888,
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
  transpileDependencies: ['element-ui', 'em-element-ui', 'vuex'],
  chainWebpack: config => {
    config.entry.app = ['@babel/polyfill', './src/main.js']
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 })) // 配置图片Base64编码的阀值
  }
}
