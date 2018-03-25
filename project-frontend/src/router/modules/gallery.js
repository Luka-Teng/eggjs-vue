// 加载组件
import upload_gallery from '@/user/components/gallery/uploadGallery'
// 未认证用户无法进入该页面
import auth from '../auth'
// 拦截未认证的用户
// import Auth from '../auth'

export default {
  routes: [
    {
      path: '/user/uploadGallery',
      name: 'upload_gallery',
      component: upload_gallery,
      beforeEnter: auth
    }
  ]
}
