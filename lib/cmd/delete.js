'use strict'
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const fs = require('fs');

const config = require('../../templates');

module.exports = () => {
  co(function *() {
    // 接收用户输入的参数
    let tplName = yield prompt('模板名字: ');

    // 删除对应的模板
    if (config.tpl[tplName]) {
      config.tpl[tplName] = undefined;
    } else {
      console.log(chalk.red.bold('\n ❌   模板不经存在!'));
      console.log('\n');

      process.exit();
    }

    // 写入template.json
    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) {
        console.log(err);
        console.log(chalk.red.bold('\n ❌   请重新运行!\n'));

        process.exit();
      }

      console.log(chalk.green.bold('\n ✅   新模板删除成功!'));
      console.log(chalk.blue('\n模板列表是: \n'));
      console.log(config);
      console.log('\n');

      process.exit();
    });
  });
};
