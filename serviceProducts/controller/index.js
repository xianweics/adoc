// const query = require('../database/query');
// const {getFavorite, addFavorite} = require('../database/sql');
export default {
  getProducts: ctx => {
    return ctx.body = {
      code: 200,
      data: {
        page: 1,
        pageSize: 10,
        total: 10,
        data: [
          {
            id: 1,
            name: 'product1'
          },
          {
            id: 2,
            name: 'product2'
          }
        ]
      }
    };
  }
};