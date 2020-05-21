import Vue from 'vue'
import Router from 'vue-router'
import { defaultRoutes, asyncRoutes } from './routers'
import store from '@/store'
import ViewUI from 'view-design'
import {
  getToken,
  setToken,
  canTurnTo,
  setTitle,
  initAsyncRouter
} from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes: defaultRoutes,
  base: process.env.BASE_URL,
  mode: 'hash'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, router.options.routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}
const initStorage = (routers, storages) => {
  routers.forEach(item => {
    if (item.name === '_monitor') {
      storages.forEach((sItem, sIndex) => {
        item.children.push({
          name: `_storage_${sItem.storageId}`,
          path: `/storage/${sItem.storageId}`,
          meta: {
            title: sItem.storageName,
            notCache: false
          },
          component: () => import('@/views/single-page/Storage.vue')
        })
      })
    }
  })
  return routers
}

router.beforeEach((to, from, next) => {
  console.log(to)
  ViewUI.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    console.log(store.state.user.hasGetInfo)
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      const result = store.dispatch('getMenus')
      result.then(res => {
        if (res.data && res.data.code === 0) {
          // let asyncRouters = initAsyncRouter(res[0].data.data.list, asyncRoutes)
          // store.dispatch('getStorage').then(res => {
          //   asyncRouters = initStorage(asyncRouters, res)
          //   asyncRouters.forEach(item => router.options.routes.push(item))
          //   router.addRoutes(asyncRouters)
          //   // console.log(router)
          //   next({
          //     name: homeName // 跳转到homeName页
          //   })
          //   // turnTo(to, store.state.user.access, next)
          // })
          const asyncRouters = initAsyncRouter(res.data.data.list, asyncRoutes)
          asyncRouters.forEach(item => router.options.routes.push(item))
          router.addRoutes(asyncRouters)
          next({
            name: homeName // 跳转到homeName页
          })
          
          // turnTo(to, store.state.user.access, next)
        }
      }).catch(res => {
        setToken('')
        // Cookies.remove('organizationId')
        next({
          name: LOGIN_PAGE_NAME
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
