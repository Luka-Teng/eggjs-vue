import Vue from 'vue'
import Vuex from 'vuex'

// 手动引入各个模块
import user from './modules/user'
import tool from './modules/tool'
import gallery from './modules/gallery'
import post from './modules/post'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    tool,
    gallery,
    post
  }
})
