// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import {mapGetters, mapActions} from 'vuex'

Vue.config.productionTip = false

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
      signup: 'signup'
    })
  },
  created () {
    // 初始化操作
    // 获取csrf_token
    this.setCsrfToken().then((data) => {
      console.log(data)
    })
  }
})
