// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from '@/router'
import {mapGetters, mapActions} from 'vuex'
// 引入载入动画组件
import loading from '@/common/loading'
// 引入载入flash组件
import flash from '@/common/flash'

// 全局样式
import './stylus/general.styl'

// 全局组件
Vue.component('loading', loading)
Vue.component('flash', flash)

Vue.config.productionTip = false
// 获取后台服务器地址
Vue.prototype.origin = 'http://localhost:7001'
// 获取首屏地址
Vue.prototype.in_path = location.pathname
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  computed: {
    ...mapGetters({
      csrf_token: 'csrf_token'
    })
  },
  methods: {
    ...mapActions({
      setCsrfToken: 'setCsrfToken',
      signup: 'signup',
      autoLogin: 'autoLogin'
    })
  },
  created () {
    // 初始化操作
    // 获取csrf_token
    this.setCsrfToken().then((data) => {
      // 如果没有csrftoken则刷新页面
      data.status === 'success' ? '' : location.reload()
      // 获取csrftoken后，自动登录
      this.autoLogin()
    })
  }
})
