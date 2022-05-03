const path = require('path');

const config = {
  clientDest: (dir = '/') => path.join(__dirname, '..', 'clientDist', dir),
  projectRoot: (dir = '/') => path.join(__dirname, '..', dir),
  publicPath: '/'
};

module.exports = config;
