const { getProp } = require('jsx-ast-utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'do not use deprecated by react-gm.',
      category: 'Possible Errors',
      recommended: 'error',
    },
    messages: {
      comSearchSelect: 'SearchSelect FilterSelect 废弃，请使用 MoreSelect',
      comTreeSelect: 'TreeSelect 废弃，请使用 Tree',
      comTrigger: 'Trigger 废弃，请使用 Popover',
      'class_gm-font-x': '废弃，请使用 gm-text-x'
    }
  },
  create: function (context) {
    return {
      JSXElement: function (node) {
        const comName = node.openingElement.name.name

        if (comName === 'SearchSelect' || comName === 'FilterSelect') {
          context.report({
            node,
            messageId: 'comSearchSelect'
          })
        } else if (comName === 'TreeSelect') {
          context.report({
            node,
            messageId: 'comTreeSelect'
          })
        } else if (comName === 'Trigger') {
          context.report({
            node,
            messageId: 'comTrigger'
          })
        }

        const classNameProp = getProp(node.openingElement.attributes, 'className')

        if (classNameProp) {
          const text = context.getSourceCode().getText(classNameProp)

          if (text.includes('gm-font-')) {
            context.report({
              node,
              messageId: 'class_gm-font-x'
            })
          }
        }

        return
      }
    }
  }
}
