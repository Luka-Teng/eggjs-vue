<template lang="jade">
  div.w3-row.luka-wrapper.w3-animate-left(:style="{ paddingTop: line_top + 'px', marginLeft: block_left + 'px' }")
    div.w3-col.s10.luka-main.w3-card-2
      div.luka-line(:style="{height: line_length + 'px', transform: `rotate(${-(deg + 90)}deg)`, left: line_left + 'px'}")
      div.s4.w3-padding.w3-teal.luka-header
        slot(name="header")
      div.s8.w3-padding.w3-light-grey.luka-body
        slot(name="body")
</template>

<script>
export default {
  props: {
    line_top: {
      type: Number,
      default: 50
    },
    line_left: {
      type: Number,
      default: 5
    },
    deg: {
      type: Number,
      default: 45
    },
    block_left: {
      type: Number,
      default: 0
    }
  },
  computed: {
    line_length () {
      const radius = parseFloat((this.deg / 180)) * Math.PI
      return Math.ceil((this.line_top / Math.sin(radius)))
    }
  }
}
</script>

<style lang="stylus" scoped>
.luka-main
  display table
  position relative
  .luka-header
    display table-cell
    white-space nowrap
    vertical-align middle
    width 30%
  .luka-body
    display table-cell
    width 70%
    color #555 !important
    word-break break-all
  .luka-line
    position absolute
    transform-origin 0 0
    left 0px
    top 1px
    width 2px
    background #666
</style>
