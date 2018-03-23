// 异步action的返回值以{status: true or false, msg: '...'}
import {loadingAndFlash} from '../decorator'
// 所需要用到的api，后期可以分离
const server_host = 'http://localhost:7001'
const apis = {
  'gallery_upload': server_host + '/uploadPictures',
  'gallery_remove': server_host + '/removePictures'
}

// 实现state的数据
const state = {
  // 当前的图库
  gallery_shown: null
}

// 实现getters
const getters = {
  gallery_shown (state) {
    return state.gallery_shown
  }
}

// 实现mutations
const mutations = {
  gallery_shown (state, payload) {
    state.gallery_shown = payload
  }
}

// 实现actions, 异步的同一用async函数，前台获取用promise
const actions = {
  async uploadPictures () {

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
