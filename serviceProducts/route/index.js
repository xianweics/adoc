import KoaRouter from 'koa-router';
import controller from '../controller';
import logRecord from './logRecord';

const router = new KoaRouter();

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
