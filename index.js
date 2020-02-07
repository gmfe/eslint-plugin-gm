const createIndex = require('create-eslint-index')
const importModules = require('import-modules')
const rules = importModules('lib/rules', { camelize: false })

const recommendedRules = createIndex.createConfig(
  {
    plugin: 'gmfe',
    field: 'meta.docs.recommended',
  },
  rules,
)

module.exports = {
  rules,
  configs: {
    recommended: {
      parser: '@typescript-eslint/parser',
      extends: [
        'standard',
        'standard-jsx',
        'plugin:react/recommended',
        'plugin:import/warnings',
        'plugin:import/errors',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'prettier/react',
        'prettier/standard',
        'prettier/@typescript-eslint',
      ],
      env: {
        browser: true,
        node: true,
      },
      plugins: ['gmfe', 'prettier', '@typescript-eslint/eslint-plugin'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
        ecmaVersion: 2020,
      },
      rules: {
        'prettier/prettier': 'error',
        ...recommendedRules,
        'react/display-name': 0,
        'react/no-find-dom-node': 0,
        'react/prop-types': [
          2,
          { ignore: ['children', 'location', 'params', 'match'] },
        ],
        'react/jsx-handler-names': 1,
        'import/default': 'off',
        'import/no-unresolved': [2, { ignore: ['^gm-i18n$'] }],
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/camelcase': 'off',
        camelcase: 0,
        '@typescript-eslint/member-naming': [
          'error',
          {
            private: '^__',
            protected: '^_',
          },
        ],
      },
      settings: {
        react: {
          pragma: 'React',
          version: 'detect',
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
          },
        },
      },
    },
    overrides: [
      {
        files: ['**/*.tsx'],
        rules: {
          'react/prop-types': 'off',
        },
      },
    ],
  },
}
