<template lang="jade">
  div(class="w3-modal" v-bind:style="{display: have_flash}")
    div(class="w3-modal-content")
      div(class="w3-container")
        span(class="w3-closebtn" @click="clearFlash") &times;
        p {{flash}}
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      flash: 'flash'
    }),
    have_flash () {
      return this.flash === null ? 'none' : 'block'
    }
  },
  methods: {
    ...mapActions({
      clearFlash: 'clearFlash'
    })
  },
  mounted () {
    window.onclick = () => {
      this.clearFlash()
    }
  }
}
</script>
