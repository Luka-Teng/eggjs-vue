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
        editor(:editorToolbar="customToolbar", v-model="content")
      p
        a(class="w3-btn w3-padding w3-blue-grey", @click="onEdit") Submit
</template>

<script>
import { VueEditor } from 'vue2-editor'
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      title: '',
      content: '',
      customToolbar: [
        [{ header: [] }],
        ['code', 'bold', 'italic', 'underline'],
        ['image']
      ]
    }
  },
  methods: {
    ...mapActions({
      getPost: 'getPost',
      editPost: 'editPost'
    }),
    onEdit () {
      const payload = {
        id: parseInt(this.$route.params.id),
        title: this.title,
        content: this.content
      }
      this.editPost(payload).then((data) => {
        if (data.status === 'success') {
          this.$router.push(`/post/${this.$route.params.id}`)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      post: 'post'
    }),
  },
  components: {
    editor: VueEditor
  },
  created () {
    this.getPost(this.$route.params.id).then((data) => {
      if (data.status === 'success') {
        this.title = this.post.title
        this.content = this.post.content
      }
    })
  }
}
</script>

<style lang="stylus"  scoped>
</style>
