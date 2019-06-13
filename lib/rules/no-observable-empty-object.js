module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'mobx observable empty object not allowed.',
      category: 'Possible Errors',
      recommended: 'error'
    },
    messages: {
      expected: 'mobx observable empty object not allowed.'
    }
  },
  create: function(context) {
    return {
      ClassProperty: function(node) {
        let isObservable =
          node.decorators &&
          node.decorators[0].expression.type === 'Identifier' &&
          node.decorators[0].expression.name === 'observable'
        if (
          isObservable &&
          node.value &&
          node.value.type === 'ObjectExpression' &&
          node.value.properties.length === 0
        ) {
          context.report({
            node,
            messageId: 'expected'
          })
        }
      }
    }
  }
}
