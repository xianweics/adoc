import query from './query.js'

export const getUser = () => query('SELECT * FROM user')
export const delUser = (id) => query(`DELETE FROM user WHERE id = ${id}`)
export const addUser = (obj) => {
  return query('INSERT INTO user set ?', obj)
}
