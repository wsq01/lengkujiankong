import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.baseUrl.hd

const axios = new HttpRequest(baseUrl)

const UID = ''
const getItem = (url, params) => {
  return axios.request({
    url,
    method: 'get',
    params
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

// 历史数据管理
export const getHHDeviceData = (params) => getItem('/csrc/hd/deviceData', params)
export const addHDDeviceData = (params) => addItem('/csrc/hd/deviceData', params)