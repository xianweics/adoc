import Koa from 'koa';
import route from './route';
import { service } from '../config';

const { port, address, protocol } = service.serviceUsers;
const app = new Koa();
route.init(app);

const server = app.listen(port, address, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.info(`backend service: ${protocol}://${host}:${port} is starting`);
});