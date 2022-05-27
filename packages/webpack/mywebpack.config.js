const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './output'),
    filename: 'bundle.js'
  },
  loaders: [path.resolve(__dirname, './lib/MyLoader.js')]
};
