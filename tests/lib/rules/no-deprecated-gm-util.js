const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-deprecated-gm-util')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    'sourceType': 'module',
  },
  parser: 'babel-eslint',
})

const cases = {
  valid: [
    `
        is.phone()
      `
  ],
  invalid: [{
    code: `
            is.mobile
          `,
    errors: [{ messageId: 'isMobile' }]
  }]
}

ruleTester.run('no-deprecated-gm-util', rule, cases)
