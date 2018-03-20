// 异步action的返回值以{status: true or false, msg: '...'}

// 控制loading, flash的装饰器, 后期可以拆分
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

// 所需要用到的api，后期可以分离
const server_host = 'http://localhost:7001'
const apis = {
  'user_signup': server_host + '/signup',
  'user_csrf_token': server_host + '/csrftoken',
  'user_login': server_host + '/login/local',
  'user_logout': server_host + '/logout'
}

// 实现state的数据
const state = {
  // 用户的基本信息
  user_info: null,
  // 由于跨域，需要存储csrftoken的存储
  csrf_token: null
}

// 实现getters
const getters = {
  user_info (state) {
    return state.user_info
  },
  csrf_token (state) {
    return state.csrf_token
  }
}

// 实现mutations
const mutations = {
  setUserInfo (state, payload) {
    state.user_info = payload.user_info
  },
  setCsrfToken (state, payload) {
    state.csrf_token = payload.csrf_token
  }
}

// 实现actions, 异步的同一用async函数，前台获取用promise
const actions = {
  // 获取csrftoken的action
  async setCsrfToken (context, payload) {
    try {
      const result = await axios({
        url: apis.user_csrf_token,
        method: 'get',
        withCredentials: true
      })
      // msg字段判断是否获取成功
      if (result.data.status === 'success') {
        const _payload = {
          csrf_token: result.data.msg
        }
        // 成功后resolve csrftoken
        context.commit('setCsrfToken', _payload)
        return {
          status: 'success',
          msg: 'set csrf toke successfully'
        }
      } else {
        return {
          status: 'failed',
          msg: 'failed to set csrf token'
        }
      }
    } catch (e) {
      console.log(e)
      return {
        status: 'failed',
        msg: e
      }
    }
  },

  // 用户登录的action
  // loading动画和flash显示的装饰器
  @loadingAndFlash
  async login (context, payload) {
    try {
      const result = await axios({
        url: apis.user_login,
        method: 'post',
        data: payload,
        withCredentials: true,
        headers: {'x-csrf-token': context.getters.csrf_token}
      })
      if (result.data.status === 'success') {
        // 登录成功需要更新用户信息
        const _payload = {
          user_info: result.data.msg
        }
        context.commit('setUserInfo', _payload)
        return {
          status: 'success',
          msg: 'login successfully'
        }
      }
    } catch (e) {
      return {
        status: 'failed',
        msg: e
      }
    }
  },

  // 用户注册的action
  // loading动画和flash显示的装饰器
  @loadingAndFlash
  async signup (context, payload) {
    try {
      const result = await axios({
        url: apis.user_signup,
        method: 'post',
        data: payload,
        withCredentials: true,
        headers: {'x-csrf-token': context.getters.csrf_token}
      })
      // 判断是否注册成功
      if (result.data.status === 'success') {
        // 登录成功需要更新用户信息
        const _payload = {
          user_info: result.data.msg
        }
        context.commit('setUserInfo', _payload)
        return {
          status: 'success',
          msg: 'signup successfully'
        }
      } else {
        return {
          status: 'failed',
          msg: result.data.msg
        }
      }
    } catch (e) {
      console.log(e)
      return {
        status: 'failed',
        msg: e
      }
    }
  },

  // 用户注销
  // loading动画和flash显示的装饰器
  @loadingAndFlash
  async logout (context) {
    try {
      const result = await axios({
        url: apis.user_logout,
        method: 'get',
        withCredentials: true
      })
      if (result.data.status === 'success') {
        // 登录成功需要更新用户信息
        context.commit('setUserInfo', {user_info: null})
        return {
          status: 'success',
          msg: 'logout successfully'
        }
      }
    } catch (e) {
      console.log(e)
      return {
        status: 'failed',
        msg: e
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
