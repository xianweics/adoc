import Koa from 'koa';
import route from './route/index.js';
import config from '../../config.js';
import bodyParser from 'koa-bodyparser';
const { service } = config

const { port, address, protocol } = service.serviceProducts;
const app = new Koa();
app.use(bodyParser());

route.init(app);

const server = app.listen(port, address, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.info(`backend service: ${protocol}://${host}:${port} is starting`);
});
