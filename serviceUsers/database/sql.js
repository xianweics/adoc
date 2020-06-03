import query from './query';

export const getMembers = () => query(`select * from member;`);
export const delMember = ([id]) => query(`delete from member where id = ${id};`);
export const addMember = ([obj]) => {
  return query(`insert into member set ?;`, obj);
};
