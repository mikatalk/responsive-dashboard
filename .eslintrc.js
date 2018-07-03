module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // because it wont let me add html snippets in tutorial :-/
    'vue/no-parsing-error': false
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}