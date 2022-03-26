import query from './query.js';

export const getGoods = () => {
  return query(`SELECT * FROM goods`);
};
export const delGoods = ([id]) => query(`DELETE FROM goods WHERE id = $1`, [id]);
export const addGoods = (items) => {
  return query(`INSERT INTO goods (name, total, rest) VALUES ($1, $2, $3)`, items);
};
