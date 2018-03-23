module.exports = () => {
  return async function (ctx, next) {
    if (ctx.isAuthenticated()) {
      next()
    } else {
      ctx.body = {
        status: 'failed',
        msg: 'unauthorized'
      }
    }
  }
}
