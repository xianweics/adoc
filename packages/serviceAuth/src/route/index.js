import controller from '../controller/index.js';
import logRecord from './logRecord.js';
import Router from '@koa/router';

export default class Route {
  static init(app) {
    logRecord.init(app);
    app.use(async (ctx, next) => {
      console.info(`service auth get request url from client: ${ctx.url}`);
      await next();
    });
    const router = new Router();
    const routes = router
      .get('/user', controller.getUser)
      .del('/user/:id', controller.delUser)
      .post('/user', controller.addUser)
      .post('/login', controller.login);
    app.use(routes.routes());
  }
}
