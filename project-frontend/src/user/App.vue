<template lang="jade">
  #app
    router-link(:to="{name: 'user_signup'}") signup
    div
      router-view
</template>

<script>
// 全局样式
import './stylus/general.styl'

export default {

}
</script>

<style lang="stylus">
</style>
