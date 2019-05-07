const nowJSON = require('./package')
const packageJSON = require('package-json')
const semver = require('semver')
const chalk = require('chalk')

packageJSON('eslint-plugin-gmfe').then(json => {
  console.log(
    `
> eslint-plugin-gmfe
check version
现在版本是 ${nowJSON.version}, 最新是 ${json.version}`)

  if (semver.gt(json.version, nowJSON.version)) {
    console.warn(chalk.red(`WARN 请安装最新 npm i eslint-plugin-gmfe@latest -D\n`))
  }
})
