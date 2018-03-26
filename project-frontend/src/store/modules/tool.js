// 控制页面载入动画和提示弹出框的状态
const state = {
  loading: false,
  flash: null
}

const getters = {
  loading (state) {
    return state.loading
  },
  flash (state) {
    return state.flash
  }
}

const mutations = {
  setLoading (state, payload) {
    state.loading = payload
  },
  setFlash (state, payload) {
    state.flash = payload
  },
  clearFlash (state) {
    state.flash = null
  }
}

const actions = {
  clearFlash ({commit}, payload) {
    commit('clearFlash')
  },
  setFlash ({commit}, payload) {
    commit('setFlash', payload)
  },
  setLoading ({commit}, payload) {
    commit('setLoading', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
