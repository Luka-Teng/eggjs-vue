<template lang="jade">
  #app
    router-link(:to="{name: 'user_signup'}") signup
    div
      router-view
</template>

<script>
export default {

}
</script>

<style lang="stylus">
</style>
