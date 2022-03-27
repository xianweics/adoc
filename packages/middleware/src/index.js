import Koa from 'koa'
import koaStatic from 'koa-static'
import { join, resolve } from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware'
import fs from 'fs'
import config from '../../config.js'
import { formatFullPath } from '../../utils.js'

const {
  client: clientConfig,
  middleware: middlewareConfig,
  service: serviceConfig
} = config
const { destName, outputHome } = clientConfig
const app = new Koa()
app.use(koaStatic(join(resolve(), '..', destName))) // 设置静态资源路径
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true) // 请求是否携带认证信息
  ctx.set('Access-Control-Allow-Origin', '*') // 指定域名访问
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Accept'
  ) // 允许请求的头字段，包括自定义头信息
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS') // 允许请求的类型
  // eslint-disable-next-line no-undef
  console.info(`middleware get request url from client: ${ctx.url}`)
  const serviceName = ctx.url.split('/').filter((item) => item)[0]
  const specificServiceConfig = serviceConfig[serviceName]

  if (ctx.method === 'OPTIONS') {
    ctx.status = 200 // option 预请求放行
  } else if (specificServiceConfig) {
    ctx.response = false // 绕过koa内置响应处理。使用代理处理请求
    const overwritePath = `^/${serviceName}`
    return createProxyMiddleware({
      target: formatFullPath(specificServiceConfig),
      pathRewrite: {
        [overwritePath]: '/'
      },
      changeOrigin: true
    })(ctx.req, ctx.res, next)
  } else {
    // 找不到页面时候。使用默认地址
    ctx.type = 'html'
    ctx.body = fs.createReadStream(join(resolve(), '..', destName, outputHome))
  }
})

const server = app.listen(
  middlewareConfig.port,
  middlewareConfig.address,
  () => {
    const host = server.address().address
    const port = server.address().port

    // eslint-disable-next-line no-undef
    console.info(`middleware: http://${host}:${port} is starting`)
  }
)
