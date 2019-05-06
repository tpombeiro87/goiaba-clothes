module.exports = {
  extends: ['@typeform/eslint-config'],
  rules: {
    'react/jsx-handler-names': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'lifecycle',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'everything-else',
          '/^render.+$/',
          'render',
        ],
      },
    ],
  },
  overrides: [
    {
      // remove the rule after https://github.com/Codeception/CodeceptJS/issues/1321 is solved
      files: ['test/features/*functional-test.js'],
      rules: {
        'arrow-parens': ['error', 'always'],
      },
    },
  ],
  globals: {
    Feature: true,
    Scenario: true,
    Helper: true,
  },
}
