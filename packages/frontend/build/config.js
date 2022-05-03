const path = require('path');
const { client: clientConfig } = require('@adoc/helper-config');

const config = {
  clientSrc: (dir = '/') =>
    path.join(__dirname, '..', clientConfig.srcName, dir),
  clientDest: (dir = '/') =>
    path.join(__dirname, '..', clientConfig.destName, dir),
  projectRoot: (dir = '/') => path.join(__dirname, '..', dir),
  publicPath: '/'
};

module.exports = config;
