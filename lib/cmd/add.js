'use strict'
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const fs = require('fs');

const config = require('../../templates');

module.exports = () => {

  co(function *() {
    // 分步接收用户输入的参数
    const tplName = yield prompt('模板名字: ');
    const gitUrl = yield prompt('Git https 链接: ');
    const branch = yield prompt('Git 分支: ');
    const description = yield prompt('模板描述: ');

    // 避免重复添加
    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {};
      config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, ''); // 过滤unicode字符
      config.tpl[tplName]['branch'] = branch;
      config.tpl[tplName]['description'] = description;
    } else {
      console.log(chalk.red.bold('\n ❌   模板已经存在!\n'));

      process.exit();
    };

    // 把模板信息写入templates.json
    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      // 处理错误
      if (err) {
        console.log(err);
        console.log(chalk.red.bold('\n ❌   请重新运行!\n'));

        process.exit();
      }

      console.log(chalk.green.bold('\n ✅   新模板添加成功!\n'));
      console.log(chalk.blue('\n模板列表是: \n'));
      console.log(config);
      console.log('\n');

      process.exit();
    });
  });
};
