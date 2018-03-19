// 所需要用到的api，后期可以分离
const server_host = 'http://localhost:7001'
const apis = {
  'user_signup': server_host + '/signup',
  'user_csrf_token': server_host + '/csrftoken',
  'user_key': server_host + '/egg_sess',
  'user_login': server_host + '/login/local',
  'user_logout': server_host + '/logout'
}

// 实现state的数据
const state = {
  // 用来判断用户是否已经登录
  user_key: null,
  // 用户的基本信息
  user_basic_info: null,
  // 由于跨域，需要存储csrftoken的存储
  csrf_token: null
}

// 实现getters
const getters = {
  user_key (state) {
    return state.user_key
  },
  user_basic_info (state) {
    return state.user_basic_info
  },
  csrf_token (state) {
    return state.csrf_token
  }
}

// 实现mutations
const mutations = {
  setUserKey (state, payload) {
    state.user_key = payload.user_key
  },
  setUserBasicInfo (state, payload) {
    state.user_basic_info = payload.user_basic_info
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
      if (result.data.msg === 'success') {
        const _payload = {
          csrf_token: result.data.data
        }
        // 成功后resolve csrftoken
        context.commit('setCsrfToken', _payload)
        console.log('set csrf toke successfully')
        return true
      } else {
        console.log('failed to set csrf toke')
        return false
      }
    } catch (e) {
      console.log(e)
      return false
    }
  },

  // 获取user_key的action
  async setUserKey (context, payload) {
    try {
      const result = await axios({
        url: apis.user_key,
        method: 'get',
        withCredentials: true
      })
      // msg字段判断是否获取成功
      if (result.data.msg === 'success') {
        const _payload = {
          user_key: result.data.data
        }
        // 成功后resolve csrftoken
        context.commit('setUserKey', _payload)
        console.log('set user key successfully')
        return true
      } else {
        console.log('failed to set user key')
        return false
      }
    } catch (e) {
      console.log(e)
      return false
    }
  },

  // 用户登录的action
  async login (context, payload) {
    try {
      const result = await axios({
        url: apis.user_login,
        method: 'post',
        data: payload,
        withCredentials: true,
        headers: {'x-csrf-token': context.getters.csrf_token}
      })
      if (result.data.msg === 'success') {
        // 登录成功需要更新用户信息
        context.commit('setUserBasicInfo', result.data.data)
        context.dispatch('setUserKey')
        console.log('login successfully')
      }
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  },

  // 用户注册的action
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
      if (result.data.msg === 'success') {
        // 登录成功需要更新用户信息
        context.commit('setUserBasicInfo', result.data.data)
        context.dispatch('setUserKey')
        console.log('signup successfully')
        return true
      } else {
        console.log('failed to signup')
        return false
      }
    } catch (e) {
      console.log(e)
      return false
    }
  },

  // 用户注销
  async logout (context) {
    try {
      const result = await axios({
        url: apis.user_logout,
        method: 'get',
        withCredentials: true
      })
      if (result.data.msg === 'success') {
        // 登录成功需要更新用户信息
        context.commit('setUserBasicInfo', {user_basic_info: null})
        context.commit('setUserKey', {user_key: null})
        console.log('logout successfully')
      }
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
