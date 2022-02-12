module.exports = {
  env: {
    es2021: true,
    'googleappsscript/googleappsscript': true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'googleappsscript'
  ],
  rules: {
  }
}
