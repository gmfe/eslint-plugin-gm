const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-observable-empty-object')

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
        class Store {
          @observable statusTaskCycle = [];
        }
      `,
    `
        class Store {
          @observable statusTaskCycle;
        }
      `,
    `
        class Store {
          @observable statusTaskCycle = { a:1 };
        }
      `,
    `
        class Store extends Component {
          statusTaskCycle = {};
        }
      `
  ],
  invalid: [
    {
      code: `
            class Store {
              @observable statusTaskCycle = {};
            }
          `,
      errors: [{ messageId: 'expected' }]
    }
  ]
}

ruleTester.run('no-observable-empty-object', rule, cases)
