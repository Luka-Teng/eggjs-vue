<template lang="jade">
  div
    div(class="w3-container w3-blue-grey w3-round")
      h2 UPLOAD POST
    div(class="w3-container w3-card-4")
      br
      p
        label(class="w3-text-grey") Title
        input(class="w3-input", v-model="title")
      p
        label(class="w3-text-grey") Content
        p.margin
        editor(api-key="3uoeyzn6541iobosjpa3hy1nzpm7yof22a4huwxhrrqc8f9u", :init="{plugins: 'wordcount', height: 400}", v-model="content")
      p
        a(class="w3-btn w3-padding w3-blue-grey", @click="onUpload") Submit
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
// 引入vuex
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    ...mapActions({
      uploadPosts: 'uploadPosts'
    }),
    onUpload () {
      const payload = {
        title: this.title,
        content: this.content
      }
      this.uploadPosts(payload).then((data) => {
        if (data.status === 'success') {
          this.$router.push(`/post/${data.data.id}`)
        }
      })
    }
  },
  components: {
    editor: Editor
  }
}
</script>

<style lang="stylus"  scoped>
</style>
