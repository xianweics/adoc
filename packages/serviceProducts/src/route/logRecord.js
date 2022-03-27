import log4js from 'log4js'
import { join, resolve } from 'path'

const { configure, getLogger } = log4js

configure({
  appenders: {
    ruleFile: {
      type: 'dateFile',
      filename: join(resolve(), '../log/server-'),
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 10 * 1000 * 1000,
      numBackups: 3,
      alwaysIncludePattern: true
    }
  },

  categories: {
    default: { appenders: ['ruleFile'], level: 'info' }
  }
})

export default class LogRecord {
  static init (app) {
    app.use(async (ctx, next) => {
      getLogger('ruleFile').info(ctx.request)
      await next()
    })
  }
}
