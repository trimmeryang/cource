const fs = require('fs');
const chalk = require('chalk');

/**
 * 获取${path}下所有的执行命令
 */
exports.getAllCommands = () => {
  const rootPkg = require(`../package.json`);
  const commands = {};
  rootPkg.workspaces.forEach((pp) => {
    const path = pp.split('/')[0];
    fs.readdirSync(path).forEach((f) => {
      if (!fs.statSync(`${path}/${f}`).isDirectory()) {
        return false;
      }

      // ignore the empty dir
      if (!fs.existsSync(`${path}/${f}/package.json`)) {
        return false;
      }

      const pkg = require(`../${path}/${f}/package.json`);
      if (pkg.private && !pkg.scripts) {
        return false;
      }
      commands[f] = {
        name: pkg.name,
        scripts: pkg.scripts
      };

      return pkg.scripts;
    });
  });

  return commands;
};
