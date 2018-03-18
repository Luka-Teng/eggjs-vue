import Vue from 'vue'
import Vuex from 'vuex'

// 手动引入各个模块
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
