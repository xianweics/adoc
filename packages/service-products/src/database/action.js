import * as sql from './sql.js';

const action = {
  goods: {
    get: ([args]) => sql.getGoods(args),
    del: ([args]) => sql.delGoods(args),
    post: ([args]) => sql.addGoods(args)
  }
};

export default action;
