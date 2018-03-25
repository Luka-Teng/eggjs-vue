<template lang="jade">
  div
    div(class="w3-container w3-teal")
      h2 Upload Gallery
    div(class="w3-container w3-card-4")
      br
      input(type="file" name="file"  @change="onFilePicked")
      p {{tags}}
</template>

<script>
// 引入vuex
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      image: 1
    }
  },
  computed: {
    ...mapGetters({
      tags: 'tags'
    })
  },
  methods: {
    ...mapActions({
      uploadPictures: 'uploadPictures',
      getTags: 'getTags'
    }),
    onFilePicked (event) {
      const files = event.target.files
      this.image = files[0]
      let param = new FormData()
      param.append('file[]', files[0])
      this.uploadPictures(param)
    }
  },
  created () {
    this.getTags()
  }
}
</script>

<style lang="stylus">
</style>
