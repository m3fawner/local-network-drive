// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: false,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
    }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  overrides: [{
    files: ['pages/api/**/*.js', 'src/node/**/*.js'],
    env: {
      node: true,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  }],
};
