// 加载组件
import signup from '@/user/components/user/signup'
// 拦截未认证的用户
// import Auth from '../auth'

export default {
  routes: [
    {
      path: '/user/signup',
      name: 'user_signup',
      component: signup
    }
  ]
}
