module.exports = {
  root: true,
  env: {
    node: true,
  },
  // DO NOT use eslint-plugin-prettier together. This plugin is based on eslint-plugin-prettier so you do not need it.
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
    'prettier/vue',
  ],
  rules: {
    'no-console':
      process.env.NODE_ENV === 'production'
        ? ['error', { allow: ['error'] }]
        : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-vars': 'off',
    'vue/valid-v-model': 'off',
    eqeqeq: 'error',
    'prettier-vue/prettier': [
      'error',
      {
        endOfLine: 'lf',
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
