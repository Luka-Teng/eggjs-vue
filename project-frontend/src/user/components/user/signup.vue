<template lang="jade">
  div
    h2 注册
    div
      姓名
      input(id="name" v-model='name')
      年龄
      input(id="age" v-model="age")
      邮箱
      input(id="email" v-model="email")
      密码
      input(id="password" v-model="password")
    div
      a(id="submit" @click="submit_login") 提交
      a(id="submit" @click="submit_logout") 注销
      p {{csrf_token}}
      p {{user_key}}
</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      name: '',
      age: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      csrf_token: 'csrf_token',
      user_key: 'user_key'
    })
  },
  methods: {
    ...mapActions({
      signup: 'signup',
      setUserKey: 'setUserKey',
      login: 'login',
      logout: 'logout'
    }),
    submit_login () {
      this.login({
        email: '123@qq.com',
        password: '1234dd'
      }).then((data) => {
        data ? '' : alert('login successfully')
      })
    },
    submit_logout () {
      this.logout()
    },
    // 注册表格的提交
    submit () {
      if (this.csrf_token) {
        const payload = {
          name: this.name,
          age: parseInt(this.age),
          email: this.email,
          password: this.password
        }
        this.signup(payload)
      } else {
        // csrf没获取到，建议刷新页面
        alert('csrf没获取到，建议刷新页面')
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
