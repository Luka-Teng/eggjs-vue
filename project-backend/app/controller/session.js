'use strict';

const Controller = require('egg').Controller

class SessionController extends Controller {
  // logout
  async logout () {
    const {ctx} = this
    ctx.logout()
    ctx.body = {
      status: 'success'
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
      const params = {
        name: ctx.request.body.name,
        age: ctx.request.body.age,
        email: ctx.request.body.email,
        password: ctx.request.body.password
      }
      let user = (await ctx.model.User.create(data)).dataValues
      ctx.login(user)
      ctx.body = {
        status: 'success',
        msg: user
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        msg: e
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
        status: 'success',
        msg: csrf_token
      }
    } else {
      ctx.body = {
        status: 'failed',
        msg: null
      }
    }
  }

  // autoLogin
  async autoLogin () {
    const {ctx} = this
    if (ctx.isAuthenticated()) {
      ctx.body = {
        status: 'success',
        msg: ctx.user.dataValues
      }
    } else {
      ctx.body = {
        status: 'failed',
        msg: null
      }
    }
  }

}

module.exports = SessionController
