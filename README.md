# eslint-plugin-gmfe

```
npm i eslint --save-dev
npm i eslint-plugin-gmfe --save-dev
```

or

```
yarn add eslint --save-dev
yarn add eslint-plugin-gmfe --save-dev
```

然后根据提示按照剩余依赖，目前是

```
yarn add babel-eslint eslint-config-prettier eslint-config-standard eslint-config-standard-jsx eslint-import-resolver-webpack eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react eslint-plugin-standard prettier -D
```

配置 .eslintrc.js

```
module.exports = {
  'extends': [
    'plugin:gmfe/recommended'
  ]
}
```

配置 .prettierrc.js

```
module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true
}
```
