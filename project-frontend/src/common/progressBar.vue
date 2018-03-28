<template  lang="jade">
  div(class="w3-progress-container")
   div(class="w3-progressbar w3-green w3-round" v-bind:style="{width: percentage}")
    div(class="w3-center w3-text-white") {{percentage}}
</template>

<script>
export default {
  props: {
    percentage: {
      type: String,
      default: '0%'
    }
  }
}
</script>

<style scoped>

</style>
