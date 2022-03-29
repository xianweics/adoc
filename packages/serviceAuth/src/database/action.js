import * as sql from './sql.js'

const action = {
  user: {
    get: ([args]) => sql.getUser(args),
    del: ([args]) => sql.delUser(args),
    post: ([args]) => sql.addUser(args),
    find: ([args]) => sql.findUser(args)
  }
}

export default action
