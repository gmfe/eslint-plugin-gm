'use strict'

let funcInfo;

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "disallow implict return in lodash _.each",
            category: "Possible Errors",
            recommended: true,
        },
        messages: {
            expectedBlockStatement: "Expected body of ArrowFunction callback of _.each to be BlockStatement.",
            expectedLiteralReturnStatement: "Expected ReturnStatement of Callback of _.each must be have no argument or have argument of Literal true or false."
        }
    },
    create: function (context) {

        function isEachCallback(node) {
            node = node.parent;

            if (node && node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
                const isLod = node.callee.object.type === 'Identifier' && node.callee.object.name === '_'
                const isEach = node.callee.property.type === 'Identifier' && (
                    node.callee.property.name === 'each' ||
                    node.callee.property.name === 'eachRight' ||
                    node.callee.property.name === 'forEach' ||
                    node.callee.property.name === 'forEachRight'
                )
                if (isLod && isEach) {
                    let CallBack = node.arguments[1];
                    const isArrowFunction = CallBack && CallBack.type === 'ArrowFunctionExpression';
                    const isFunction = CallBack && CallBack.type === 'FunctionExpression';
                    if (isArrowFunction) {
                        if (CallBack.body.type !== 'BlockStatement') {
                            context.report({
                                node: CallBack,
                                messageId: 'expectedBlockStatement'
                            })
                        } else {
                            return true;
                        }
                    } else if (isFunction) {
                        return true;
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
                    shouldCheck: isEachCallback(node),
                    node
                };
            },

            // Pops this function's information.
            onCodePathEnd() {
                funcInfo = funcInfo.upper;
            },

            ReturnStatement: function (node) {
                let pass = (
                    !node.argument ||     //return无参数
                    (   //或return true/false字面量
                        node.argument.type === 'Literal' &&   
                        (node.argument.value === true || node.argument.value === false)
                    )
                )
                if(!pass){
                    context.report({
                        node,
                        messageId: 'expectedLiteralReturnStatement'
                    })
                }
            },
        }
    }
}