/* eslint-disable no-undef */
module.exports = {
  root: true,

  plugins: ['tailwindcss'],

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:tailwindcss/recommended',
  ],
  settings: {
    'tailwindcss': {
      'config': 'tailwind.config.cjs'
    }
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'never'],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'tailwindcss/no-custom-classname': 'off'
  }
}