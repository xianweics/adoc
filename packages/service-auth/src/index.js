import Koa from 'koa';
import route from './route/index.js';
import bodyParser from 'koa-bodyparser';

const service = {
  port: 4002,
  address: '127.0.0.1',
  protocol: 'http'
};
const { port, address, protocol } = service;
const app = new Koa();
app.use(bodyParser());
route.init(app);

const server = app.listen(port, address, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.info(`backend service: ${protocol}://${host}:${port} is starting`);
});
