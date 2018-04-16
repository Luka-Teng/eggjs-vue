<template lang="jade">
  div(class="w3-modal", :style="{display: show ? 'block' : 'none'}")
    div(class="w3-modal-content")
      vueCropper(
        ref="cropper",
        :img="img",
        :autoCrop="true",
        :autoCropWidth="500",
        :autoCropHeight="500",
        :original="true"
      )
      a(class="w3-btn w3-red del-cropper" @click="$emit('hideCropper')") X
      a(class="w3-btn w3-green confirm-cropper" @click="onConfirm") √
</template>

<script>
import vueCropper from 'vue-cropper'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: ''
    },
    id: {
      type: Number
    }
  },
  components: {
    vueCropper
  },
  methods: {
    onConfirm () {
      this.$refs.cropper.getCropData((data) => {
        this.$emit('onCropped', data, this.id)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.w3-modal
  padding 10px !important
  .w3-modal-content
    width 100% !important
    height 100% !important
    .del-cropper
      position absolute
      right 0px
      top 0px
      width 50px
    .confirm-cropper
      position absolute
      right 0px
      top 36px
      width 50px
</style>
