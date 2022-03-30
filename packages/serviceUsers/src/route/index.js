import controller from "../controller/index.js";
import logRecord from "./logRecord.js";
import Router from "@koa/router";

export default class Route {
  static init(app) {
    logRecord.init(app);
    app.use(async (ctx, next) => {
      console.info(`service users get request url from client: ${ctx.url}`);
      await next();
    });
    const router = new Router();
    const routes = router
      .get("/users", controller.getUsers)
      .del("/users/:id", controller.delUsers)
      .post("/users", controller.addUsers);
    app.use(routes.routes());
  }
}
