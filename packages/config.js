const serviceUsers = 'serviceUsers';
const serviceProducts = 'serviceProducts';
const config = {
  sentry: {
    dsn: 'http://ff7764eb82a94a6dbf34182217a88106@localhost:9000/1',
    send: false
  },
  client: {
    srcName: '',
    destName: 'clientDist',
    entryHome: 'index.html',
    outputHome: 'index.html'
  },
  middleware: {
    port: 2000,
    address: '127.0.0.1',
    protocol: 'http',
    isHttps: false,
    service: {
      vue: serviceUsers,
      react: serviceProducts
    }
  },
  service: {
    [serviceUsers]: {
      port: 4000,
      address: '127.0.0.1',
      protocol: 'http'
    },
    [serviceProducts]: {
      port: 4001,
      address: '127.0.0.1',
      protocol: 'http'
    }
  }
};
module.exports = config;
