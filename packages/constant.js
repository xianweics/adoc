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
  responseCodeMap,
  whiteRouter,
};
