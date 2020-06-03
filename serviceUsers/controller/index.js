import database from '../database';

export default {
  getUsers: async (ctx) => {
    const data = await database('get', 'member');
    return ctx.body = {
      code: 200,
      data: data
    };
  },
  delUsers: async (ctx) => {
    const data = await database('del','member', ctx.params.id);
    let message = 'success';
    if (!data) {
      message = 'fail';
    }
    return ctx.body = {
      code: 200,
      data: {
        message
      }
    };
  },
  addUsers: async (ctx) => {
    const data = await database('post', 'member', ctx.request.body);
    let message = 'success';
    if (!data) {
      message = 'fail';
    }
    return ctx.body = {
      code: 200,
      data: {
        message
      }
    };
  }
};
