'use strict';

const Controller = require('egg').Controller

class SessionController extends Controller {
  //message if login success
  async loginSuccess() {
    const {ctx} = this
    ctx.body = {
      msg: 'success'
    }
    ctx.status = 200
  }

  //message if login failed
  async loginFailed() {
    const {ctx} = this
    ctx.body = {
      msg: 'failed'
    }
    ctx.status = 500
  }

  //logout
  async logout() {
    const {ctx} = this
    ctx.logout()
    ctx.body = {
      msg: 'success'
    }
    ctx.status = 200
  }

  //signup
  async signup() {
    const {ctx} = this
    //注册字段的验证
    const rule = {
      name: 'string',
      age: 'int',
      email: 'email',
      password: 'string'
    }
    ctx.validate(rule)
    ctx.body = {
      msg: 'success',
      sm: ctx.get('x-csrf-token')
    }
  }

  //get csrf csrf_token
  async csrfToken() {
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
}

module.exports = SessionController
