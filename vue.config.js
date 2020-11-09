const path = require('path');

module.exports = {
  publicPath: './',
  lintOnSave: false,
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
    },
    overlay: {
      warnings: false,
      errors: false
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      modules: ['node_modules'],
      alias: {
        main: path.resolve(__dirname, './src/src'),
        packages: path.resolve(__dirname, './src/packages'),
        'nt-ui': path.resolve(__dirname, './src')
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
