import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.baseUrl.rt

const axios = new HttpRequest(baseUrl)

// const UID = ''
const getItem = (url, params) => {
  return axios.request({
    url,
    method: 'get',
    params
  })
}
// const addItem = (url, params) => {
//   const data = {
//     uid: UID,
//     version: config.version,
//     data: params
//   }
//   return axios.request({
//     url,
//     method: 'put',
//     data
//   })
// }

// 设备实时数据管理
export const getHDeviceData = (params) => getItem('/csrc/hd/deviceData', params)

export const getHDeviceDataTrend = (params) => getItem('/csrc/hd/deviceData/trend', params)
