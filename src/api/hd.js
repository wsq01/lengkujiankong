import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.baseUrl.hd

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

// 历史设备报警管理
export const getDeviceAlarm = (params) => getItem('/csrc/device/hd/deviceAlarm', params)

export const getRTDeviceData = (params) => getItem('/csrc/device/rt/deviceData', params)
