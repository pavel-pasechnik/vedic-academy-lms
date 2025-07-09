const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'stylelint',
    'prettier',
  ],
  parserOptions: {
    parser: ['@babel/eslint-parser'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['app/frontend/**/*.{js,jsx}'],
      rules: {
        'n/no-unsupported-features/node-builtins': 'off',
      },
    },
  ],
  plugins: ['react', 'react-hooks', 'react-refresh', 'jsx-a11y', 'prettier', 'import'],
  rules: {
    'no-console': 0,
    'n/no-missing-import': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-unused-vars': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/no-unresolved': ['error', { ignore: ['\\?worker$', '\\?url$', '\\?raw$'] }],
    'import/no-extraneous-dependencies': ['error', { packageDir: [path.resolve(__dirname)] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
          'object',
          'type',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'components',
            group: 'internal',
          },
          {
            pattern: 'common',
            group: 'internal',
          },
          {
            pattern: 'routes/ **',
            group: 'internal',
          },
          {
            pattern: 'assets/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['@bundles', path.resolve(__dirname, 'app/frontend/bundles')],
          ['@lib', path.resolve(__dirname, 'app/frontend/lib')],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
    'import/extensions': ['.js', '.jsx'],
    'import/ignore': ['.scss'],
  },
  globals: {
    getApp: false,
    Page: false,
    wx: false,
    App: false,
    getCurrentPages: false,
    Component: false,
    Raven: 'readonly',
  },
};
