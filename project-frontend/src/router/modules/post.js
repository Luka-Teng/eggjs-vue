// 加载组件
import upload_post from '@/user/components/post/uploadPost'
import show_post from '@/user/components/post/showPost'
// 拦截未认证的用户
import auth from '../auth'

export default {
  routes: [
    {
      path: '/post/upload',
      name: 'upload_post',
      component: upload_post,
      beforeEnter: auth
    },
    {
      path: '/post/:id',
      name: 'show_post',
      component: show_post
    }
  ]
}
