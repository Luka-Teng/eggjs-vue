module.exports = {
  // 获取随机token字符串
  getToken (length) {
    const len = length || 40
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos = chars.length
    let token = ''
    for (i = 0; i < len; i++) {
      token += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return token
  },
  // 判断是否为数组
  isArray (o) {
    return Object.prototype.toString.call(o)=='[object Array]';
  }
}
