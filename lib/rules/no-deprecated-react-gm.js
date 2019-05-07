// TODO class

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
        }

        if (comName === 'TreeSelect') {
          context.report({
            node,
            messageId: 'comTreeSelect'
          })
        }

        if (comName === 'Trigger') {
          context.report({
            node,
            messageId: 'comTrigger'
          })
        }

        return
      }
    }
  }
}
