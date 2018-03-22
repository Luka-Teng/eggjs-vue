'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
    if (ctx.isAuthenticated()) {
      ctx.body = `hi ${ctx.user.name}`
    } else {
      ctx.body = 'hi, egg'
    }
  }
}

module.exports = HomeController
