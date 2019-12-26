module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'i18n grammar detection',
      category: 'Possible Errors',
      recommended: 'error'
    },
    messages: {
      isVariable: 't函数的key只能为字符串常量(Literal)，请使用单引号或双引号包裹'
    }
  },
  create: function(context) {
    return {
      CallExpression: function(node) {
        if (node.callee.name === 't' && node.arguments[0].type !== 'Literal') {
          context.report({
            node,
            messageId: 'isVariable'
          })
        }
      },
      MemberExpression: function(node) {
        if (node.object.name === 'i18next' && node.parent.arguments[0].type !== 'Literal') {
          context.report({
            node,
            messageId: 'isVariable'
          })
        }
      }
    }
  }
}
