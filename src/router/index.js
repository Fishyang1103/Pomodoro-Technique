import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect 直接導向去 list
    redirect: '/list',
    meta: {
      title: '蕃茄鐘'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Settings.vue'),
    meta: {
      title: '蕃茄鐘 | 設定'
    }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
    meta: {
      title: '蕃茄鐘'
    }
  }
]

const router = new VueRouter({
  routes
})

// 把title改成去的那頁
router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
