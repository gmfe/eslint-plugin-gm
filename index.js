const createIndex = require('create-eslint-index');
const importModules = require('import-modules');
const rules = importModules('lib/rules', { camelize: false });

const recommendedRules = createIndex.createConfig({
  plugin: 'gmfe',
  field: 'meta.docs.recommended'
}, rules);

module.exports = {
  rules,
  configs: {    
    recommended: {
      parser: 'babel-eslint',
      extends: [
        'standard',
        'standard-jsx',
      ],
      rules: {
        'react/jsx-tag-spacing': ['error', {'beforeSelfClosing': 'never'}],
        'camelcase': 0,
        ...recommendedRules
      },
      plugins: ['gmfe']
    }
  }
};