# eslint-plugin-gmfe

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-gmfe`:

```
$ npm install eslint-plugin-gmfe --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-gmfe` globally.

## Usage

添加配置到 `.eslintrc` 

- 方式一：使用全部 recommended 规则
```json
{
    "extends": [
        "plugin:gmfe/recommended"
    ]
}
```

- 方式二：单独使用规则

```json
{
    "plugins":[
        "gmfe"
    ],
    "rules": {
        "gmfe/no-implict-lodash-each-return": "error",
    }
}
```

### 规则列表

`no-implict-lodash-each-return` _.each/forEach 回调只允许使用块级函数体语法，并且不包含 return 语句 或 `return` `return true` `return false`




