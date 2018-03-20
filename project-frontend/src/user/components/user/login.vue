<template lang="jade">
  div
    div(class="w3-container w3-teal")
      h2 LOGIN
    div(class="w3-container w3-card-4")
      br
      p
        label(class="w3-text-grey") email
        input(class="w3-input" v-model="email")
      p
        label(class="w3-text-grey") password
        input(class="w3-input" v-model="password")
      p
        a(class="w3-btn w3-padding w3-teal" @click="submit") Submit
</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
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
      login: 'login'
    }),
    // 注册表格的提交
    submit () {
      if (this.csrf_token) {
        const payload = {
          email: this.email,
          password: this.password
        }
        this.login(payload).then((data) => {
          if (data.status === 'success') {
            this.$router.push('/user')
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
