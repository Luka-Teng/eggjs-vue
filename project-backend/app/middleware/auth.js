module.exports = () => {
  return async function (ctx, next) {
    if (ctx.isAuthenticated()) {
      next()
    } else {
      ctx.body = {
        msg: 'no permission to access'
      }
      ctx.status = 500
    }
  }
}
