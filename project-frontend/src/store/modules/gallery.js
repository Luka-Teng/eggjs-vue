// 异步action的返回值以{status: true or false, msg: '...'}
import {loadingAndFlash, loading} from '../decorator'
// 所需要用到的api，后期可以分离
const server_host = 'http://localhost:7001'
const apis = {
  'gallery_upload': server_host + '/uploadPictures',
  'gallery_remove': server_host + '/removePictures',
  'gallery_get_tags': server_host + '/tags',
  'gallery_get_pictures': server_host + '/getPictures'
}

// 实现state的数据
const state = {
  // 当前的图库
  gallery_shown: [],
  tags: []
}

// 实现getters
const getters = {
  gallery_shown (state) {
    return state.gallery_shown
  },
  tags (state) {
    return state.tags
  }
}

// 实现mutations
const mutations = {
  set_gallery (state, payload) {
    state.gallery_shown = payload
  },
  add_gallery (state, payload) {
    // payload必须是array
    state.gallery_shown.push(...payload)
  },
  tags (state, payload) {
    state.tags = payload
  }
}

// 实现actions, 异步的同一用async函数，前台获取用promise
const actions = {
  // 上传用户的图库
  @loadingAndFlash
  async uploadPictures (context, payload) {
    try {
      const result = await axios({
        url: apis.gallery_upload,
        method: 'post',
        data: payload,
        withCredentials: true,
        headers: {
          'x-csrf-token': context.getters.csrf_token,
          'Content-Type': 'multipart/form-data'
        }
      })
      if (result.data.status === 'success') {
        return {
          status: 'success',
          msg: result.data.msg
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

  // 获取所有图片标签
  async getTags (context) {
    try {
      const result = await axios({
        url: apis.gallery_get_tags,
        method: 'get'
      })
      if (result.data.status === 'success') {
        context.commit('tags', result.data.msg)
        return {
          status: 'success',
          msg: 'get the tags successfully'
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

  // 获取图片, from是图片的index，limit是图片数
  @loading
  async loadPictures (context, {from, limit}) {
    try {
      const result = await axios({
        url: apis.gallery_get_pictures,
        method: 'get',
        params: {from, limit},
        withCredentials: true
      })
      if (result.data.status === 'success') {
        context.commit('set_gallery', result.data.msg)
        return {
          status: 'success',
          msg: 'get the pictures successfully'
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
