import database from '../database/index.js'
import {
  wrapperResponse
} from '../../../utils.js'
import {
  responseCodeMap
} from '../../../constant.js'

export default {
  getUser: async (ctx) => {
    const data = await database('get', 'user')
    ctx.body = wrapperResponse({
      code: 200,
      data
    })
  },
  delUser: async (ctx) => {
    const data = await database('del', 'user', ctx.params.id)
    let message = 'success'
    if (!data) {
      message = 'fail'
    }
    ctx.body = wrapperResponse({
      code: 200,
      data,
      message
    })
  },
  addUser: async (ctx) => {
    const data = await database('post', 'user', ctx.request.body)
    let message = 'success'
    if (!data) {
      message = 'fail'
    }
    ctx.body = wrapperResponse({
      code: 200,
      data,
      message
    })
  },
  login: async (ctx) => {
    const {
      userName,
      password
    } = ctx.request.body
    const data = await database('find', 'user', {
      userName,
      password
    })
    console.log(data, 2222222, !data)
    if (!data || !data.length) {
      console.log(responseCodeMap.NO_ACCOUNT, 3333)
      ctx.body = wrapperResponse(responseCodeMap.NO_ACCOUNT)
      return
    }
    ctx.body = wrapperResponse(responseCodeMap.SUCCESS)
  }
}
