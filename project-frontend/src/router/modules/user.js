// 加载组件
import signup from '@/user/components/user/signup'
import login from '@/user/components/user/login'
import home from '@/user/components/user/home'
// 拦截未认证的用户
// import Auth from '../auth'

export default {
  routes: [
    {
      path: '/user/signup',
      name: 'user_signup',
      component: signup
    },
    {
      path: '/user/login',
      name: 'user_login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
}
