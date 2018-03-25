import store from '../store'

export default (to, from, next) => {
  if (store.getters.user_info) {
    next()
  } else {
    next('/user/login')
  }
}
