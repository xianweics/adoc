const config = {
  sentry: {
    dsn: 'http://ff7764eb82a94a6dbf34182217a88106@localhost:9000/1',
    send: false
  },
  client: {
    srcName: 'client',
    destName: 'clientDist',
    entryHome: 'index.html',
    outputHome: 'index.html'
  },
  middleware: {
    port: 3000,
    address: '127.0.0.1',
    protocol: 'http'
  },
  service: {
    serviceUsers: {
      port: 4000,
      address: '127.0.0.1',
      protocol: 'http'
    },
    serviceProducts: {
      port: 4001,
      address: '127.0.0.1',
      protocol: 'http'
    }
  }
};
module.exports = config;