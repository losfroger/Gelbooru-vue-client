/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'never'],
    'quotes': [2, 'single', { 'avoidEscape': true }]
  }
}