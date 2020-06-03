const Router = require('@koa/router');
import controller from '../controller';
import logRecord from './logRecord';

const router = new Router();

const routes = router.get('/products', controller.getProducts);

export default class Route {
  static init (app) {
    logRecord.init(app);
    app.use(routes.routes());
    app.use(async (ctx, next) => {
      console.info(`service get request url from client: ${ctx.url}`);
      await next();
    });
  }
}
