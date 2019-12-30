// 查找t函数的声明来源
function getVariable(variableList) {
  const result = variableList.find(v => v.name === 't')
  return result && result.defs[0].parent.source && result.defs[0].parent.source.value === 'gm-i18n'
}

// 递归获取t函数的来源
function getTSource(context, node) {
  // 返回由给定节点声明的变量
  if (getVariable(context.getDeclaredVariables(node))) {
    return true
  } else {
    if (node.parent) {
      if (node.parent.type === 'BlockStatement') {
        // 一个语句块,也就是由大括号包围的语句序列.
        const NPB = node.parent.body
        if (NPB.find(n => getVariable(context.getDeclaredVariables(n)))) return true
      }
      return getTSource(context, node.parent)
    } else {
      return node.body.find(n => n.type.includes('Declaration') && getVariable(context.getDeclaredVariables(n)))
    }
  }
}

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
      // A function or method call expression.
      CallExpression: function(node) {
        if (node.callee.name === 't' && node.arguments[0].type !== 'Literal' && getTSource(context, node)) {
          context.report({
            node,
            messageId: 'isVariable'
          })
        }
      },
      // 一个member表达式. If computed === true, the node corresponds to a computed e1[e2] expression and property is an Expression.
      // If computed === false, the node corresponds to a static e1.x expression and property is an Identifier.
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
