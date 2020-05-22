import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.baseUrl.server

const axios = new HttpRequest(baseUrl)

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
const UID = userInfo.userId

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

// 设备实时数据管理
export const editServerDeviceModel = (params) => editItem('/csrc/server/deviceModel', params)
