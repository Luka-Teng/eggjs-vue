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
      a(id="submit" @click="submit") 提交
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
      csrf_token: 'csrf_token'
    })
  },
  methods: {
    ...mapActions({
      signup: 'signup'
    }),
    // 注册表格的提交
    submit () {
      if (this.csrf_token) {
        const payload = {
          name: this.name,
          age: parseInt(this.age),
          email: this.email,
          password: this.password
        }
        this.signup(payload).then((data) => {
          if (data) {
            // 显示成功
          } else {
            // 显示失败
          }
        })
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
