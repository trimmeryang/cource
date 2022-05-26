/**
 * 使用下面的命令启动
 * yarn in ${package_name} ${command}
 */

const execa = require('execa');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2))._;
const { getAllCommands } = require('./utils');

const allCommands = getAllCommands();
const [proj, command] = args;
if (!allCommands[proj]?.scripts[command]) {
  console.error(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(`Command ${chalk.underline(proj, command)} not found!`)}`);
  process.exit(1);
}

execa('yarn', ['workspace', allCommands[proj]['name'], command], {
  stdio: 'inherit'
});
