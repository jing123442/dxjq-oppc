const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 10240
      })) // 配置图片Base64编码的阀值

    if (process.env.NODE_ENV !== 'development') {
      config.output.filename('js/[name].[contenthash].js').chunkFilename('js/[name].[contenthash].js').end()
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV_MODE === 'analyzer') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static'
        })
      )
    }
    config.optimization = {
      runtimeChunk: {
        name: 'runtime'
      },
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 300 * 1024,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: (module) => {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
  }
}
