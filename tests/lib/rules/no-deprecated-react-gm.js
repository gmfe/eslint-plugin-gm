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
  valid: [
    {
      code: '<MoreSelect />'
    },
    {
      code: '<Popover />'
    },
    {
      code: '<div className="gm-text-12"/>'
    },
    {
      code: '<div className={className("gm-text-12", {"gm-text-12": true})} />'
    }
  ],
  invalid: [
    {
      code: '<SearchSelect />',
      errors: [{ messageId: 'comSearchSelect' }]
    },
    {
      code: '<FilterSelect />',
      errors: [{ messageId: 'comSearchSelect' }]
    },
    {
      code: '<TreeSelect />',
      errors: [{ messageId: 'comTreeSelect' }]
    },
    {
      code: '<Trigger />',
      errors: [{ messageId: 'comTrigger' }]
    },
    {
      code: '<Dropper />',
      errors: [{ messageId: 'comDropper' }]
    },
    {
      code: '<div className="gm-font-5" />',
      errors: [{ messageId: 'class_gm-font-x' }]
    }
  ]
})
