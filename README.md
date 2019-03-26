# eslint-plugin-myrule

myrule

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-myrule`:

```
$ npm install eslint-plugin-myrule --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-myrule` globally.

## Usage

Add `myrule` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "myrule"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "myrule/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





