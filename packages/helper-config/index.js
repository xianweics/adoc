const serviceUsers = "serviceUsers";
const serviceProducts = "serviceProducts";
const serviceAuth = "serviceAuth";
const sentry = {
  dsn: "http://ff7764eb82a94a6dbf34182217a88106@localhost:9000/1",
  open: false,
};
const client = {
  srcName: "",
  destName: "clientDist",
  entryHome: "index.html",
  outputHome: "index.html",
};
const middleware = {
  port: 2000,
  address: "127.0.0.1",
  protocol: "http",
  isHttps: false,
  service: {
    vue: serviceUsers,
    react: serviceProducts,
    auth: serviceAuth,
  },
};
const service = {
  [serviceUsers]: {
    port: 4000,
    address: "127.0.0.1",
    protocol: "http",
  },
  [serviceProducts]: {
    port: 4001,
    address: "127.0.0.1",
    protocol: "http",
  },
  [serviceAuth]: {
    port: 4002,
    address: "127.0.0.1",
    protocol: "http",
  },
};

const auth = {
  secretKey: "MICRO_SECRET_AUTH_KEY",
  secretRefreshKey: "MICRO_SECRET_AUTH_REFRESH_KEY",
  accessTokenExp: "10m",
  refreshTokenExp: "24h",
};

const responseCodeMap = {
  NO_ACCOUNT: {
    code: 30001,
    data: null,
    message: "用户名或者密码错误",
  },
  TOKEN_EXPIRATION: {
    code: 30002,
    data: null,
    message: "访问令牌过期",
  },
  TOKEN_ERROR: {
    code: 30003,
    data: null,
    message: "访问令牌无效",
  },
  REFRESH_TOKEN_EXPIRATION: {
    code: 30004,
    data: null,
    message: "刷新令牌过期",
  },
  REFRESH_TOKEN_ERROR: {
    code: 30004,
    data: null,
    message: "刷新令牌无效",
  },
  SUCCESS: {
    code: 200,
    message: "操作成功",
  },
  ERROR: {
    code: 9,
    message: "操作失败",
  },
};

const whiteRouter = ["/serviceAuth/login"];

module.exports = {
  sentry,
  client,
  middleware,
  service,
  auth,
  responseCodeMap,
  whiteRouter,
};
