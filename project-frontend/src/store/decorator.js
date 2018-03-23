// 控制loading, flash的装饰器
function loadingAndFlash (target, name, descriptor) {
  // 获取原函数
  const oldValue = descriptor.value
  // 重构新函数
  descriptor.value = async function ({commit}) {
    // 每次异步操作都唤起loading动画
    commit('setLoading', true)
    // 运行原函数，并且返回值, async函数返回的
    let result = await oldValue.apply(target, arguments)
    // 运行结束后关闭loading
    commit('setLoading', false)
    // 判断返回值，并显示flash
    commit('setFlash', result.msg)
    // 貌似必须返回一个值，否则会无限重复
    return result
  }
  return descriptor
}

export {
  loadingAndFlash
}
