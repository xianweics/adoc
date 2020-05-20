const path = require('path');

const config = {
  pathSrc: (dir = '/') => path.join(__dirname, '../src', dir),
  pathDest: (dir = '/') => path.join(__dirname, '../dist', dir),
  publicPath: '/',
};

module.exports = config;
