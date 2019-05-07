const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-deprecated-react-gm')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('no-deprecated-react-gm', rule, {
  valid: [{
    code: '<MoreSelect />'
  }],
  invalid: [{
    code: '<SearchSelect />',
    errors: [{ messageId: 'comSearchSelect' }]
  }, {
    code: '<FilterSelect />',
    errors: [{ messageId: 'comSearchSelect' }]
  }, {
    code: '<TreeSelect />',
    errors: [{ messageId: 'comTreeSelect' }]
  }, {
    code: '<Trigger />',
    errors: [{ messageId: 'comTrigger' }]
  }]
})
