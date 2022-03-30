import log4js from "log4js";
import { join, resolve } from "path";

const { configure, getLogger } = log4js;

configure({
  appenders: {
    message: {
      type: "dateFile",
      filename: join(resolve(), "../log/server-auth"),
      pattern: "yyyy-MM-dd.log",
      maxLogSize: 10 * 1000 * 1000,
      numBackups: 3,
      alwaysIncludePattern: true,
    },
  },

  categories: {
    default: { appenders: ["message"], level: "info" },
  },
});

export default class LogRecord {
  static init(app) {
    app.use(async (ctx, next) => {
      getLogger("message").info(ctx.request);
      await next();
    });
  }
}
