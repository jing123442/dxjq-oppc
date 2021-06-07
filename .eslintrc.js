module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'eqeqeq': 0,
    'no-prototype-builtins': 0,
    'space-before-function-paren': 0,
    'standard/no-callback-literal': 0,
    'no-multiple-empty-lines': [0, { max: 2 }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
