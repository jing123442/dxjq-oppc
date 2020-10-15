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
    ['@babel/preset-env']
  ],
  plugins: ['@babel/plugin-transform-runtime']
}
