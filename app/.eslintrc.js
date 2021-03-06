module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/extensions': 'off',
    'react/forbid-prop-types': 'off',
    'react/prop-types': 'off',
  },
};
