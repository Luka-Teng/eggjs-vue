// 所需要用到的api
const server_host = 'http://localhost:7001'
const apis = {
  'user_signup': server_host + '/signup',
  'user_csrf_token': server_host + '/csrftoken'
}

// 实现state的数据
const state = {
  user_key: null,
  user_basic_info: null,
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
      const _payload = {
        csrf_token: result.data.data
      }
      context.commit('setCsrfToken', _payload)
      // 成功后resolve csrftoken
      console.log('get csrf toke successfully')
      return result.data.data
    } catch (e) {
      console.log(e)
      console.log('can not get csrf toke')
      // 失败时返回resolve false
      return false
    }
  },

  // 用户注册的action
  async signup (context, payload) {
    try {
      const result = await axios({
        url: apis.user_signup,
        method: 'post',
        data: {
          name: payload.name,
          age: payload.age,
          email: payload.email,
          password: payload.password
        },
        withCredentials: true,
        headers: {'x-csrf-token': context.getters.csrf_token}
      })
      console.log('signup successfully')
      // todo list 存储用户的信息
      return result.data.data
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
