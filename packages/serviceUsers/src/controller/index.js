import database from '../database/index.js';
import wrapperResponse from "./wrapperResponse.js";

export default {
  getUsers: async (ctx) => {
    const data = await database('get', 'member');
    ctx.body = wrapperResponse({ code: 200, data });
  },
  delUsers: async (ctx) => {
    const data = await database('del', 'member', ctx.params.id);
    let message = 'success';
    if (!data) {
      message = 'fail';
    }
    ctx.body = wrapperResponse({ code: 200, data, message });
  },
  addUsers: async (ctx) => {
    const data = await database('post', 'member', ctx.request.body);
    let message = 'success';
    if (!data) {
      message = 'fail';
    }
    ctx.body = wrapperResponse({ code: 200, data, message });
  }
};
