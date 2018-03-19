const LocalStrategy = require('passport-local').Strategy
const assert = require('assert')

module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    // 检查用户
    assert(user.provider, 'user.provider should exists')
    let _user = await ctx.model.User.findOne({
      where: {
        email: user.username,
        password: user.password
      }
    })
    return _user
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    //只需要返回user的email
    return user.email
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user_email) => {
    // 这里的信息是email
    return await ctx.model.User.findOne({
      where: {
        email: user_email
      }
    })
  });
};
