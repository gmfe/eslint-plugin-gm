const _ = require('lodash')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'do not use deprecated by gm-util.',
      category: 'Possible Errors',
      recommended: 'error',
    },
    messages: {
      isMobile: 'is.mobile 废弃，请使用 is.phone()'
      // TODO other
    }
  },
  create: function (context) {
    return {
      MemberExpression: function (node) {
        if (
          node.object.type === 'Identifier' &&
          node.object.name === 'is' &&
          node.property.type === 'Identifier' &&
          node.property.name === 'mobile'
        ) {
          context.report({
            node,
            messageId: 'isMobile'
          })
        }
      }
    }
  }
}
