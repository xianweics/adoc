import Router from '@koa/router';
import controller from '../controller/index.js';
import logRecord from './logRecord.js';

export default class Route {
  static init(app) {
    logRecord.init(app);
    app.use(async (ctx, next) => {
      console.info(`service products get request url from client: ${ctx.url}`);
      await next();
    });
    const router = new Router();
    const routes = router
      .get('/goods', controller.getGoods)
      .del('/goods/:id', controller.delGoods)
      .post('/goods', controller.addGoods);
    app.use(routes.routes());
  }
}
