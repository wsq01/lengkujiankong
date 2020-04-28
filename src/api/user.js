import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.baseUrl.csrc

const axios = new HttpRequest(baseUrl)

const UID = ''
const getItem = (url, params) => {
  return axios.request({
    url,
    method: 'get',
    params
  })
}
const deleteItem = (url, id) => {
  return axios.request({
    url: url + '/' + id,
    method: 'delete'
  })
}
const addItem = (url, params) => {
  const data = {
    uid: UID,
    version: config.version,
    data: params
  }
  return axios.request({
    url,
    method: 'put',
    data
  })
}
const editItem = (url, params) => {
  const data = {
    uid: UID,
    version: config.version,
    data: params
  }
  return axios.request({
    url,
    method: 'post',
    data
  })
}

export const login = (params) => getItem('/csrc/sys/login', params)
// 按钮管理
export const getButton = (params) => getItem('/csrc/sys/button', params)
export const editButton = (params) => editItem('/csrc/sys/button', params)
export const deleteButton = (params) => deleteItem('/csrc/sys/button', params)
export const addButton = (params) => addItem('/csrc/sys/button', params)
// 菜单管理
export const getMenu = (params) => getItem('/csrc/sys/menu', params)
export const editMenu = (params) => editItem('/csrc/sys/menu', params)
export const deleteMenu = (params) => deleteItem('/csrc/sys/menu', params)
export const addMenu = (params) => addItem('/csrc/sys/menu', params)
// 仓库管理
export const getStorage = (params) => getItem('/csrc/sys/storage', params)
export const getStorageByUid = (params) => getItem('/csrc/sys/user/storage/' + params)
export const editStorage = (params) => editItem('/csrc/sys/storage', params)
export const deleteStorage = (params) => deleteItem('/csrc/sys/storage', params)
export const addStorage = (params) => addItem('/csrc/sys/storage', params)
// 角色管理
export const getRole = (params) => getItem('/csrc/sys/role', params)
export const editRole = (params) => editItem('/csrc/sys/role', params)
export const deleteRole = (params) => deleteItem('/csrc/sys/role', params)
export const addRole = (params) => addItem('/csrc/sys/role', params)
// 设备管理
export const getDevice = (params) => getItem('/csrc/sys/device', params)
export const getDeviceBySN = (params) => getItem('/csrc/sys/device/SN', params)
export const editDevice = (params) => editItem('/csrc/sys/device', params)
export const deleteDevice = (params) => deleteItem('/csrc/sys/device', params)
export const addDevice = (params) => addItem('/csrc/sys/roldevicee', params)
// 用户管理
export const getUser = (params) => getItem('/csrc/sys/user', params)
export const getUserByInfo = (params) => getItem('/csrc/sys/user/info', params)
export const editUser = (params) => editItem('/csrc/sys/user', params)
export const deleteUser = (params) => deleteItem('/csrc/sys/user', params)
export const addUser = (params) => addItem('/csrc/sys/user', params)
// 菜单和按钮关联管理
export const getMenuRelButton = (params) => getItem('/csrc/sys/menuRelButton', params)
export const editMenuRelButton = (params) => editItem('/csrc/sys/menuRelButton', params)
export const deleteMenuRelButton = (params) => deleteItem('/csrc/sys/menuRelButton', params)
export const addMenuRelButton = (params) => addItem('/csrc/sys/menuRelButton', params)
// 角色和菜单关联管理
export const getRoleRelMenu = (params) => getItem('/csrc/sys/roleRelMenu', params)
export const editRoleRelMenu = (params) => editItem('/csrc/sys/roleRelMenu', params)
export const deleteRoleRelMenu = (params) => deleteItem('/csrc/sys/roleRelMenu', params)
export const addRoleRelMenu = (params) => addItem('/csrc/sys/roleRelMenu', params)
// 用户和仓库关联管理
export const getUserRelStorage = (params) => getItem('/csrc/sys/userRelStorage', params)
export const editUserRelStorage = (params) => editItem('/csrc/sys/userRelStorage', params)
export const deleteUserRelStorage = (params) => deleteItem('/csrc/sys/userRelStorage', params)
export const addUserRelStorage = (params) => addItem('/csrc/sys/userRelStorage', params)
// 用户和角色关联管理
export const getUserRelRole = (params) => getItem('/csrc/sys/userRelRole', params)
export const editUserRelRole = (params) => editItem('/csrc/sys/userRelRole', params)
export const deleteUserRelRole = (params) => deleteItem('/csrc/sys/userRelRole', params)
export const addUserRelRole = (params) => addItem('/csrc/sys/userRelRole', params)
// 菜单管理
export const getMenus = (params) => getItem('/csrc/sys/menu', params)
