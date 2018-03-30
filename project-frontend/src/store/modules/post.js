// 异步action的返回值以{status: true or false, msg: '...'}
import {loading, flash, checkSession, loadingAndFlash} from '../decorator'
// 所需要用到的api，后期可以分离
const server_host = 'http://localhost:7001'
const apis = {
  'post_upload': server_host + '/uploadPost',
  'post_remove': server_host + '/removePost',
  'post_get_posts': server_host + '/getPosts',
  'post_get_post': server_host + '/getPost'
}

// 实现state的数据
const state = {
  posts: [],
  post: null
}

// 实现getters
const getters = {
  posts (state) {
    return state.posts
  },
  post (state) {
    return state.post
  }
}

// 实现mutations
const mutations = {
  set_posts (state, payload) {
    state.posts = payload
  },
  set_post (state, payload) {
    state.post = payload
  }
}

// 实现actions, 异步的同一用async函数，前台获取用promise
const actions = {
  // upload posts
  @loadingAndFlash
  @checkSession
  async uploadPosts (context, payload) {
    try {
      const result = await axios({
        url: apis.post_upload,
        method: 'post',
        data: payload,
        withCredentials: true,
        headers: {
          'x-csrf-token': context.getters.csrf_token
        }
      })
      if (result.data.status === 'success') {
        return {
          status: 'success',
          msg: 'have uploaded the post successfully',
          data: result.data.msg
        }
      } else {
        return {
          status: 'failed',
          msg: result.data.msg
        }
      }
    } catch (e) {
      return {
        status: 'failed',
        msg: e.response.data.message
      }
    }
  },

  // get a certain post
  @loadingAndFlash
  async getPost (context, payload) {
    try {
      const result = await axios({
        url: apis.post_get_post + '/' + payload,
        method: 'get'
      })
      if (result.data.status === 'success') {
        context.commit('set_post', result.data.msg)
        return {
          status: 'success',
          msg: 'get the post successfully'
        }
      } else {
        return {
          status: 'failed',
          msg: result.data.msg
        }
      }
    } catch (e) {
      return {
        status: 'failed',
        msg: e.response.data.message
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
