import database from '../database/index.js';
import jwt from 'jsonwebtoken';
import { wrapperResponse } from '@adoc/helper-utils';
import { auth, responseCodeMap } from '@adoc/helper-config';
import { RedisClient } from '@adoc/helper-service-init';
import { redisRefreshTokenEx } from '../redis/config.js';
const redisClient = await RedisClient.getInstance().redisClient;
const { secretKey, accessTokenExp, refreshTokenExp, secretRefreshKey } = auth;

export default {
  getUser: async (ctx) => {
    const data = await database('get', 'user');
    ctx.body = wrapperResponse({
      code: 200,
      data
    });
  },
  delUser: async (ctx) => {
    const data = await database('del', 'user', ctx.params.id);
    let message = 'success';
    if (!data) {
      message = 'fail';
    }
    ctx.body = wrapperResponse({
      code: 200,
      data,
      message
    });
  },
  addUser: async (ctx) => {
    const data = await database('post', 'user', ctx.request.body);
    let message = 'success';
    if (!data) {
      message = 'fail';
    }
    ctx.body = wrapperResponse({
      code: 200,
      data,
      message
    });
  },
  login: async (ctx) => {
    const { userName, password } = ctx.request.body;
    const data = await database('find', 'user', {
      userName,
      password
    });
    console.info(userName, password);
    // 用户不存在或者密码错误
    if (!data || !data.length) {
      console.log(responseCodeMap.NO_ACCOUNT, 3333);
      ctx.body = wrapperResponse(responseCodeMap.NO_ACCOUNT);
      return;
    }
    const { userName: uName, password: pwd, ...restInfo } = data[0];
    const userInfo = {
      userName: uName
    };
    const accessToken = jwt.sign(userInfo, secretKey, {
      expiresIn: accessTokenExp
    });
    const refreshToken = jwt.sign(userInfo, secretRefreshKey, {
      expiresIn: refreshTokenExp
    });

    // use redis set refreshToken
    await redisClient.set(
      refreshToken,
      JSON.stringify({ userName, accessToken }),
      {
        NX: true,
        EX: redisRefreshTokenEx
      }
    );
    ctx.body = wrapperResponse({
      ...responseCodeMap.SUCCESS,
      data: {
        accessToken,
        refreshToken,
        ...restInfo
      }
    });
  }
};