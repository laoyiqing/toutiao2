import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/',
    name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home', // 默认子路由，只能有1个
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 开启props 传参，说白了就是把路由参数映射到组件的props数据中
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/Chat/Chat.vue')
  }
]
// 1.创建路由的实例对象
const router = new VueRouter({
  routes
})

// 所有有权限页面的路径，都在这个数组之中
const pagePathArr = ['/home', '/video', '/my', '/qa']

// 为路由的实例对象挂载全局前置守卫
router.beforeEach((to, from, next) => {
  // 访问的是有权限的页面，需要判断用户是否登录
  if (pagePathArr.indexOf(to.path) !== -1) {
    // 1. 从 store 中获取 token 的值
    //    注意：store.state.tokenInfo 要么是 {} 空对象，要么是包含 {token, refresh_token} 的对象
    // const tokenStr = store.state.tokenInfo.token
    const tokenStr = store.state.user
    if (tokenStr) {
      // 1.1 token 有值，已登录过（操作：直接放行）
      next()
    } else {
      // 1.2 token 不存在，没有登录（操作：强制跳转到登录页）
      next(`/login?pre=${to.fullPath}`)
    }
  } else {
    // 访问的是没有权限的页面
    next()
  }
})
// 1. 将 VueRouter 本身提供的 $router.push 方法转存到常量中
const originalPush = VueRouter.prototype.push
// 2. 自定义 $router.push 方法，在内部调用原生的 originalPush 方法进行路由跳转；并通过 .catch 捕获错误
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  // 通过 .catch 捕获错误
  return originalPush.call(this, location).catch(err => err)
}
export default router
