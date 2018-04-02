<template  lang="jade">
  ul.w3-pagination.w3-border.w3-round.w3-margin-16
    li(v-for="index in max_page", :key="index")
      a(:class="{'w3-teal': (curr_page === index)}", href="javascript:void(0)", @click="$emit('paginationEvent', index)") {{index}}
</template>

<script>
export default {
  props: {
    max_page: {
      type: Number,
      default: 0
    },
    curr_page: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>

</style>
