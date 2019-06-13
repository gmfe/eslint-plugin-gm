const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-window-template-state')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  parser: 'babel-eslint'
})

const cases = {
  valid: [
    `
        window.React
      `,
    `
        window.React.g_user
      `
  ],
  invalid: [
    {
      code: `
            window.g_user
          `,
      errors: [{ messageId: 'expected' }]
    },
    {
      code: `
          window.g_user.pemission
        `,
      errors: [{ messageId: 'expected' }]
    }
  ]
}

ruleTester.run('no-window-template-state', rule, cases)
