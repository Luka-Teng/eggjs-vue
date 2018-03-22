'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  //定义router和controller变量
  const { router, controller } = app

  //加载中间件
  //验证用户
  const auth = app.middleware.auth()
  //本地登录策略
  const local = app.passport.authenticate('local',{
        successRedirect:false,
        failureRedirect: false
  })

  //首页路由
  router.get('/', controller.home.index)

  //登录路由
  //邮箱密码验证
  router.post('/login/local', local, (ctx) => {
    ctx.body = {
      status: 'success',
      msg: ctx.user.dataValues
    }
  })

  //注销路由
  router.get('/logout', controller.session.logout)

  //注册路由
  router.post('/signup', controller.session.signup)

  //获取csrftoken
  router.get('/csrftoken', controller.session.csrfToken)

  // 自动登录
  router.post('/autoLogin', controller.session.autoLogin)

};
