'use strict';

const Controller = require('egg').Controller

class SessionController extends Controller {
  // logout
  async logout () {
    const {ctx} = this
    ctx.logout()
    ctx.body = {
      msg: 'success'
    }
    ctx.status = 200
  }

  // signup
  async signup () {
    const {ctx} = this
    // 注册字段的验证
    const rule = {
      name: 'string',
      age: 'int',
      email: 'email',
      password: 'string'
    }
    // 数据库操作
    try {
      ctx.validate(rule)
      const data = {
        name: ctx.request.body.name,
        age: ctx.request.body.age,
        email: ctx.request.body.email,
        password: ctx.request.body.password
      }
      let user = (await ctx.model.User.create(data)).dataValues
      ctx.login(user)
      ctx.body = {
        msg: 'success',
        data: user
      }
    } catch (e) {
      ctx.body = {
        msg: 'failed',
        data: e
      }
    }
  }

  // get csrf_token
  async csrfToken () {
    const {ctx} = this
    const csrf_token = ctx.cookies.get('csrfToken', {
      signed: false
    })
    if (csrf_token) {
      ctx.body = {
        msg: 'success',
        data: csrf_token
      }
    } else {
      ctx.body = {
        msg: 'failed',
        data: null
      }
    }
  }

  //get egg_sess
  async eggSess () {
    const {ctx} = this
    const egg_sess = ctx.cookies.get('EGG_SESS', {
      signed: false,
      httpOnly: true
    })
    if (egg_sess) {
      ctx.body = {
        msg: 'success',
        data: egg_sess
      }
    } else {
      ctx.body = {
        msg: 'failed',
        data: null
      }
    }
  }
}

module.exports = SessionController
