import database from "../database";
import wrapperResponse from './wrapperResponse';

export default {
  getGoods: async (ctx) => {
    const data = await database('get', 'goods');
    return ctx.body = wrapperResponse({ code: 200, data: data.rows });
  },
  delGoods: async (ctx) => {
    const data = await database('del', 'goods', ctx.params.id);
    let message = 'success';
    if (!data) {
      message = 'fail';
    }
    return ctx.body = wrapperResponse({ code: 200, data, message });
  },
  addGoods: async (ctx) => {
    const { name, total } = ctx.request.body;
    const rest = 0;
    const data = await database('post', 'goods', [name, total, rest]);
    let message = 'success';
    if (!data) {
      message = 'fail';
    }
    return ctx.body = wrapperResponse({ code: 200, data, message });
  }
};
