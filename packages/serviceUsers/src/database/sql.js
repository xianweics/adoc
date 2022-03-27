import query from './query.js'

export const getMembers = () => query('SELECT * FROM member')
export const delMember = (id) => query(`DELETE FROM member WHERE id = ${id}`)
export const addMember = (obj) => {
  return query('INSERT INTO member set ?', obj)
}
