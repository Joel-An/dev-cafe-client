module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    "prefer-destructuring": ["error", {
      "array": true,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }],
    'no-underscore-dangle': ['error', { allow: ['_id','_isMounted'] }],
    'no-console': ['error', { allow: ['error'] }],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
      },
    ],
  },
};
