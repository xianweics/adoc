import Koa from "koa";
import koaStatic from "koa-static";
import { join, resolve } from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import fs from "fs";
import jwt from "jsonwebtoken";
import {
  client as clientConfig,
  middleware as middlewareConfig,
  service as serviceConfig,
  auth as authConfig,
} from "@project/helper-config";
import { formatFullPath, wrapperResponse } from "@project/helper-utils";
import { responseCodeMap, whiteRouter } from "../../constant.js";

const { destName, outputHome } = clientConfig;
const { secretKey, accessTokenExp, secretRefreshKey } = authConfig;
const app = new Koa();
app.use(koaStatic(join(resolve(), "..", destName))); // 设置静态资源路径
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Credentials", true); // 请求是否携带认证信息
  ctx.set("Access-Control-Allow-Origin", "*"); // 指定域名访问
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Accept, accessToken, refreshToken, userName"
  ); // 允许请求的头字段，包括自定义头信息
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS"); // 允许请求的类型
  // eslint-disable-next-line no-undef
  console.info(`middleware get request url from client: ${ctx.url}`);
  const serviceName = ctx.url.split("/").filter((item) => item)[0];
  const specificServiceConfig = serviceConfig[serviceName];
  let isPass = false;

  // 接口放行，无需校验
  if (whiteRouter.includes(ctx.url)) {
    isPass = true;
  } else {
    // 重新获取访问令牌
    if (ctx.url === "/serviceAuth/setToken") {
      const refreshToken = ctx.request.header.refreshtoken;
      const userName = ctx.request.header.username;
      // 校验刷新令牌
      jwt.verify(refreshToken, secretRefreshKey, function (err, result) {
        if (err) {
          if (err.name === "TokenExpiredError") {
            // 刷新令牌过期
            ctx.body = wrapperResponse(
              responseCodeMap.REFRESH_TOKEN_EXPIRATION
            );
          } else {
            // 刷新令牌无效
            ctx.body = wrapperResponse(responseCodeMap.REFRESH_TOKEN_ERROR);
          }
        } else {
          // 刷新令牌正常，重新生成访问令牌
          const accessTokenRestore = jwt.sign({ userName }, secretKey, {
            expiresIn: accessTokenExp,
          });
          ctx.body = wrapperResponse({
            ...responseCodeMap.SUCCESS,
            data: { accessToken: accessTokenRestore },
            message: null,
          });
          isPass = false;
        }
      });
    } else {
      const accessToken = ctx.request.header.accesstoken;
      // 校验访客令牌
      jwt.verify(accessToken, secretKey, function (err, result) {
        if (err) {
          if (err.name === "TokenExpiredError") {
            // 访客令牌过期
            ctx.body = wrapperResponse(responseCodeMap.TOKEN_EXPIRATION);
          } else {
            // 访客令牌无效
            ctx.body = wrapperResponse(responseCodeMap.TOKEN_ERROR);
          }
        } else {
          // 校验通过
          isPass = true;
        }
      });
    }
  }

  if (!isPass) return;
  if (ctx.method === "OPTIONS") {
    ctx.status = 200; // option 预请求放行
  } else if (specificServiceConfig) {
    ctx.response = false; // 绕过koa内置响应处理。使用代理处理请求
    const overwritePath = `^/${serviceName}`;
    return createProxyMiddleware({
      target: formatFullPath(specificServiceConfig),
      pathRewrite: {
        [overwritePath]: "/",
      },
      changeOrigin: true,
    })(ctx.req, ctx.res, next);
  } else {
    // 找不到页面时候。使用默认地址
    ctx.type = "html";
    ctx.body = fs.createReadStream(join(resolve(), "..", destName, outputHome));
  }
});

const server = app.listen(
  middlewareConfig.port,
  middlewareConfig.address,
  () => {
    const host = server.address().address;
    const port = server.address().port;

    // eslint-disable-next-line no-undef
    console.info(`middleware: http://${host}:${port} is starting`);
  }
);
