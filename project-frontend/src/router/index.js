import Vue from 'vue'
import Router from 'vue-router'

// 手动引入各个模块
import user from './modules/user'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...user.routes
  ]
})
