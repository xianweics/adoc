import database from '../database/index.js'
import wrapperResponse from './wrapperResponse.js'

export default {
  getUser: async (ctx) => {
    const data = await database('get', 'user')
    console.log(data, 1111)
    ctx.body = wrapperResponse({ code: 200, data })
  },
  delUser: async (ctx) => {
    const data = await database('del', 'user', ctx.params.id)
    let message = 'success'
    if (!data) {
      message = 'fail'
    }
    ctx.body = wrapperResponse({ code: 200, data, message })
  },
  addUser: async (ctx) => {
    const data = await database('post', 'user', ctx.request.body)
    let message = 'success'
    if (!data) {
      message = 'fail'
    }
    ctx.body = wrapperResponse({ code: 200, data, message })
  }
}
