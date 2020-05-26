import { login, getStorage } from '@/api/user'
import { getRTDeviceInfo } from '@/api/hd'
import { setToken, getToken, getUserControlMenuByRouter } from '@/libs/util'
import { defaultRoutes } from '@/router/routers'

export default {
  state: {
    avatarImgPath: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
    token: getToken(),
    access: ['super_admin', 'admin'],
    userInfo: {},
    userMenu: [],
    hasGetInfo: false,
    storages: []
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo (state, info) {
      state.userInfo = info
    },
    setUserMenu (state, list) {
      state.userMenu = list
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setStorage (state, storages) {
      state.storages = storages
    }
  },
  getters: {
    userMenuList: (state, getter, rootState) => getUserControlMenuByRouter(defaultRoutes)
  },
  actions: {
    // 登录
    async handleLogin ({ commit }, { userName, password }) {
      const res = await login({ username: userName.trim(), password })
      if (res.data && res.data.code === 0) {
        commit('setUserInfo', res.data.data)
        commit('setToken', res.data.data.jwt)
        sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
      }
      return res
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    async getMenus ({ dispatch, commit }) {
      // const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      // try {
      //   const res = await getMenus({ roleId: userInfo.role[0].roleId })
      //   if (res.data && res.data.code === 0) {
      await dispatch('getStorage')
      commit('setHasGetInfo', true)
      // commit('setUserMenu', res.data.data.list)
      //   }
      //   return res
      // } catch (error) {
      //   console.log(error)
      // }
    },
    async getStorage ({ state, commit }) {
      commit('setHasGetInfo', true)
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      try {
        const res = await getRTDeviceInfo({ userId: userInfo.userId })
        commit('setStorage', res.data.data.list)
        return res.data.data.list
      } catch (error) {
        console.log(error)
      }
    }
  }
}
