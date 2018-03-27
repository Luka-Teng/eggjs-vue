// 加载组件
import upload_picture from '@/user/components/gallery/uploadPicture'
import show_gallery from '@/user/components/gallery/showGallery'
// 未认证用户无法进入该页面
import auth from '../auth'
// 拦截未认证的用户
// import Auth from '../auth'

export default {
  routes: [
    {
      path: '/uploadPicture',
      name: 'upload_picture',
      component: upload_picture,
      beforeEnter: auth
    },
    {
      path: '/showGallery',
      name: 'show_gallery',
      component: show_gallery,
      beforeEnter: auth
    }
  ]
}
