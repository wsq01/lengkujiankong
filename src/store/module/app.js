import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled
} from '@/libs/util'
import router from '@/router'
import { defaultRoutes } from '@/router/routers'

import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    menuList: [],
    deviceId: '',
    socketMsg: '{}'
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(defaultRoutes, rootState.user.access)
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setSocketMsg (state, msg) {
      state.socketMsg = msg
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      const homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        const homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      const tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag (state, { route, type = 'unshift' }) {
      const router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setMenuList (state, list) {
      state.menuList = list
    },
    setDeviceId (state, deviceId) {
      state.deviceId = deviceId
    }
  },
  actions: {
    reqSocketMsg ({ state, commit }, msg) {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            commit('setSocketMsg', msg)
            resolve(msg)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
