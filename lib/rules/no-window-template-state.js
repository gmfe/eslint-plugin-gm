const _ = require('lodash')
module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "get template state (starts with 'g_') from window not allowed.",
            category: "Possible Errors",
            recommended: 'error',
        },
        messages: {
            expected: "不允许直接从全局对象获取模板变量.",
        }
    },
    create: function (context) {
        return {
            MemberExpression: function (node) {
                if(
                    node.object.type === 'Identifier' &&
                    node.object.name === 'window' &&
                    node.property.type === 'Identifier' &&
                    _.startsWith(node.property.name, 'g_')
                ){
                    context.report({
                        node,
                        messageId: 'expected'
                    })
                }
            },
        }
    }
}