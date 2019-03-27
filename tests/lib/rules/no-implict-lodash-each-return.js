const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-implict-lodash-each-return')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    "sourceType": "module",
  }
})

const cases = {
    valid: [
      `
          _.each(list, v => {
              v.checked = false;
          })
      `,
      `
          _.each(list, v => {
              v.checked = false;
              return
          })
      `,
      `
          _.each(list, v => {
              v.checked = false;
              return true
          })
      `,
      `
          _.each(list, v => {
              v.checked = false;
              return false
          })
      `,
      //multi _.each
      `
          _.each(list, v => {
              v.checked = false;
              return false
          })
          _.each(list, v => {
              v.checked = false;
          })
      `,
      //nested _.each
      `
          _.each(list, v => {
              v.checked = false;
              _.each(list, v => {
                  v.checked = false;
              })
              return false
          })
      `,
      //multi return statement
      `
          _.each(list, v => {
              v.checked = false;
              _.each(list, v => {
                  v.checked = false;
              })
              _.each(list, v => {
                v.checked = false;
                return true
            })
              return true
              return false
          })
      `,
      //not each
      ` 
        _.map(list, v => {
            v.checked = false;
            _.each(list, v => {
                v.checked = false;
            })
            _.each(list, v => {
                v.checked = false;
                return true
            })
            return true
            return false
        })
        `,
        ` 
        _.each()
        `,
        ` 
        _.each([])
        `,
        ` 
        _.each([], () => {})
        `,
        ` 
        _.each([], null)
        `,
        ` 
        each([], null)
        `,
        

    ],
    invalid: [
      {
          code: `
              _.each(list, v => v.checked = false);
          `,
          errors: [{ messageId: 'expectedBlockStatement' }]
      },
      //return not Literal
      {
          code: `
            _.each(list, v => {
                v.checked = false;
                return v;
            })
          `,
          errors: [{ messageId: 'expectedLiteralReturnStatement' }]
      },
      {
        code: `
          _.forEach(list, v => {
              v.checked = false;
              return v;
          })
        `,
        errors: [{ messageId: 'expectedLiteralReturnStatement' }]
    },
      {
        code: `
          _.eachRight(list, v => {
              v.checked = false;
              return v;
          })
        `,
        errors: [{ messageId: 'expectedLiteralReturnStatement' }]
    },
      {
        code: `
          _.forEachRight(list, v => {
              v.checked = false;
              return v;
          })
        `,
        errors: [{ messageId: 'expectedLiteralReturnStatement' }]
    },
      //return not Boolean Literal
      {
        code: `
        _.each(list, v => {
            v.checked = false;
            return 123;
        })
        `,
        errors: [{ messageId: 'expectedLiteralReturnStatement' }]
    },
      //multi _.each
      {
          code: `
              _.each(list, v => {
                  v.checked = false;
                  return;
              })
              _.each(list, v => v.checked = false)
          `,
          errors: [{ messageId: 'expectedBlockStatement' }]
      },
      //nested _.each
      {
        code: `
        _.each(list, v => {
            v.checked = false;
            _.each(list, v => {
                v.checked = false;
                return 123
            })
            return false
        })
        `,
        errors: [{ messageId: 'expectedLiteralReturnStatement' }]
    },
      //nested _.each
      {
        code: `
        _.each(list, v => {
            v.checked = false;
            _.each(list, v => v.checked = false)
            return false
        })
        `,
        errors: [{ messageId: 'expectedBlockStatement' }]
    },
      //multi return statement
      {
        code: `
            _.each(list, v => {
                v.checked = false;
                _.each(list, v => {
                    v.checked = false;
                })
                _.each(list, v => {
                    v.checked = false;
                    return false
                })
                return 123
                return false
            })
        `,
        errors: [{ messageId: 'expectedLiteralReturnStatement' }]
    }
    ]
  }

ruleTester.run('test rule', rule, cases)
