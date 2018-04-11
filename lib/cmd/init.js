'use strict'
const exec = require('child_process').exec; // 操作命令行
const path = require('path');
const co = require('co');
const ora = require('ora');
const prompt = require('co-prompt');
const chalk = require('chalk');

const config = require('../../templates');

const spinner = ora('正在生成...');

module.exports = () => {

 co(function *() {
    // 处理用户输入
    const tplName = yield prompt('模板名字: ');
    const projectName = yield prompt('项目名字: ');
    let gitUrl;
    let branch;

    if (!config.tpl[tplName]) {
      console.log(chalk.red.bold('\n ❌   模板并没有没添加，请运行 rcli add 进行添加!'));

      process.exit();
    }

    gitUrl = config.tpl[tplName].url;
    branch = config.tpl[tplName].branch;

    // git命令，远程拉取项目并自定义项目名
    const cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;

    spinner.start();

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.log(chalk.red.bold('\n ❌   请重新运行!\n'));

        process.exit();
      }
      // 删除 git 文件
      exec('cd ' + projectName + ' && rm -rf .git', (err, out) => {
        if (err) {
          console.log(err);

          process.exit();
        }

        spinner.stop();

        console.log(chalk.green.bold('\n ✅   初始化完成！'))
        console.log(`\n cd ${projectName} && npm install \n`)

        process.exit();
      });
    })
  })
}
