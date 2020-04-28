import { login, getMenus, getStorageByUid } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

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
  getters: {},
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      const username = userName
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then((res) => {
          console.log(res)
          if (res.data && res.data.code === 0) {
            commit('setUserInfo', res.data.data)
            commit('setToken', res.data.data.jwt)
            sessionStorage.setItem('userId', JSON.stringify(res.data.data.userId))
            sessionStorage.setItem('userInfo', JSON.stringify(res.data.data.role))
          }
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
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
    getMenus ({ state, commit }) {
      const roleIds = JSON.parse(sessionStorage.getItem('userInfo'))
      return new Promise((resolve, reject) => {
        try {
          const promises = roleIds.map(item => getMenus({ roleId: item.roleId }))
          Promise.all(promises).then(res => {
            console.log(res)
            commit('setHasGetInfo', true)
            commit('setUserMenu', res[0].data.data.list)
            resolve(res)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getStorage ({ state, commit }) {
      let uid = sessionStorage.getItem('userId')
      uid = uid.slice(1, uid.length - 1)
      return new Promise((resolve, reject) => {
        try {
          getStorageByUid(uid).then(res => {
            commit('setStorage', res.data.list)
            resolve(res.data.data.list)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
