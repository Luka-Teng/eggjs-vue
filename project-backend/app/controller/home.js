'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
    const {ctx} = this
    let picture = await ctx.model.Picture.create({
      url: 'sss',
      user_id: 7
    })
    let user = await picture.getUser()
    console.log(user)
    if (ctx.isAuthenticated()) {
      ctx.body = `hi ${ctx.user.name}`
    } else {
      ctx.body = 'hi, egg'
    }
  }
}

module.exports = HomeController
