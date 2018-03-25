module.exports = {
  // 获取随机token字符串
  getToken (length) {
    const len = length || 30
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
  },

  //判断是否是图片
  isImage (name) {
    const image_list = ['image/jpeg', 'image/png', 'image/x-png', 'image/gif']
    if (image_list.indexOf(name) >= 0) {
      return true
    }
    return false
  }
}
