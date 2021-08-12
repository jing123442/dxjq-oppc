module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        polyfills: [
          'es6.promise',
          'es6.symbol'
        ]
      }
    ],
    ['@babel/preset-env', {
      corejs: 2,
      useBuiltIns: 'usage',
      targets: {
        browsers: [
          '> 1%',
          'last 2 versions',
          'not ie <= 9'
        ]
      }
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-syntax-dynamic-import']
  ]
}
