import database from '../database/index.js'
import {
  wrapperResponse
} from '../../../utils.js'

export default {
  getGoods: async (ctx) => {
    const data = await database('get', 'goods')
    ctx.body = wrapperResponse({
      code: 200,
      data: data.rows
    })
  },
  delGoods: async (ctx) => {
    const data = await database('del', 'goods', ctx.params.id)
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
  addGoods: async (ctx) => {
    const {
      name,
      total
    } = ctx.request.body
    const rest = 0
    const data = await database('post', 'goods', [name, total, rest])
    let message = 'success'
    if (!data) {
      message = 'fail'
    }
    ctx.body = wrapperResponse({
      code: 200,
      data,
      message
    })
  }
}
