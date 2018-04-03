<template lang="jade">
  div
    div(class="w3-container w3-blue-grey")
      h2 Sign Up
    div(class="w3-container w3-card-4")
      br
      p
        label(class="w3-text-grey") name
        input(class="w3-input", v-model="name")
      p
        label(class="w3-text-grey") age
        input(class="w3-input", v-model="age")
      p
        label(class="w3-text-grey") email
        input(class="w3-input", v-model="email")
      p
        label(class="w3-text-grey") password
        input(class="w3-input", v-model="password")
      p
        a(class="w3-btn w3-padding w3-blue-grey" @click="submit") Submit
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

<style lang="stylus" scoped>
</style>
