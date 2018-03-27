module.exports = () => {
  return async function (ctx, next) {
    if (ctx.isAuthenticated()) {
      await next()
    } else {
      ctx.body = {
        status: 'failed',
        msg: 'session expired'
      }
    }
  }
}
