'use strict'
const chalk = require('chalk');

const config = require('../../templates');

module.exports = () => {
  console.log(chalk.blue('\n模板列表是: \n'));
  console.log(config.tpl);
  console.log('\n');
  process.exit();
};
