const createIndex = require('create-eslint-index')
const importModules = require('import-modules')
const rules = importModules('lib/rules', { camelize: false })

const recommendedRules = createIndex.createConfig(
  {
    plugin: 'gmfe',
    field: 'meta.docs.recommended'
  },
  rules
)

module.exports = {
  rules,
  configs: {
    recommended: {
      parser: 'babel-eslint',
      extends: [
        'standard',
        'standard-jsx',
        'plugin:react/recommended',
        'prettier',
        'prettier/react',
        'prettier/standard'
      ],
      plugins: ['gmfe', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
        ...recommendedRules,
        'react/display-name': 0,
        'react/no-find-dom-node': 0,
        'react/prop-types': [
          2,
          { ignore: ['children', 'location', 'params', 'match'] }
        ],
        camelcase: 0
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  }
}
