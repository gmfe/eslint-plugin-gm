const createIndex = require('create-eslint-index')
const importModules = require('import-modules')
const rules = importModules('lib/rules', { camelize: false })

const recommendedRules = createIndex.createConfig({
  plugin: 'gmfe',
  field: 'meta.docs.recommended'
}, rules)

module.exports = {
  rules,
  configs: {
    recommended: {
      parser: 'babel-eslint',
      extends: [
        'standard',
        'standard-jsx',
        'plugin:react/recommended'
      ],
      rules: {
        'react/display-name': 0,
        'react/jsx-tag-spacing': ['error', { 'beforeSelfClosing': 'never' }],
        'react/no-find-dom-node': 0,
        'react/prop-types': [2, { ignore: ['children', 'location', 'params'] }],
        'camelcase': 0,
        ...recommendedRules
      },
      plugins: ['gmfe'],
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  }
}
