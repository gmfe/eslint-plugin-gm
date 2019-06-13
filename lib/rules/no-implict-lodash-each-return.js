module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow implict return in lodash _.each',
      category: 'Possible Errors',
      recommended: 'error'
    },
    messages: {
      expectedBlockStatement:
        'Expected body of ArrowFunction callback of _.each to be BlockStatement.',
      expectedLiteralReturnStatement:
        'Expected ReturnStatement of Callback of _.each must be have no argument or have argument of Literal true or false.'
    }
  },
  create: function(context) {
    let functionNames = ['each', 'eachRight', 'forEach', 'forEachRight']

    let funcInfo = {
      upper: null,
      codePath: null,
      shouldCheck: false,
      node: null
    }

    function shouldCheck(node) {
      node = node.parent

      if (
        node &&
        node.type === 'CallExpression' &&
        node.callee.type === 'MemberExpression'
      ) {
        const isLod =
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === '_'
        const isEach =
          node.callee.property.type === 'Identifier' &&
          functionNames.includes(node.callee.property.name)
        if (isLod && isEach) {
          let CallBackNode = node.arguments[1] //获取第二个参数
          const isArrowFunction =
            CallBackNode && CallBackNode.type === 'ArrowFunctionExpression'
          const isFunction =
            CallBackNode && CallBackNode.type === 'FunctionExpression'
          if (isArrowFunction) {
            if (CallBackNode.body.type !== 'BlockStatement') {
              context.report({
                node: CallBackNode,
                messageId: 'expectedBlockStatement'
              })
            } else {
              return true
            }
          } else if (isFunction) {
            return true
          }
        }
      }
    }

    return {
      // Stacks this function's information.
      onCodePathStart(codePath, node) {
        funcInfo = {
          upper: funcInfo,
          codePath,
          shouldCheck: !!shouldCheck(node),
          node
        }
      },

      // Pops this function's information.
      onCodePathEnd() {
        funcInfo = funcInfo.upper
      },

      ReturnStatement: function(node) {
        if (funcInfo.shouldCheck) {
          let pass =
            !node.argument || //return无参数 //或return true/false字面量
            (node.argument.type === 'Literal' &&
              (node.argument.value === true || node.argument.value === false))
          if (!pass) {
            context.report({
              node,
              messageId: 'expectedLiteralReturnStatement'
            })
          }
        }
      }
    }
  }
}
