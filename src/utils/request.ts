import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import { devUrl, proUrl } from './url'
const request = axios.create({
  baseURL: proUrl,//devUrl 本地请求路径，proUrl 在线请求路径
  // timeout: 15000,//请求超时时常
})
//请求拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
  // if (config.headers) {
  //   config.headers.token = sessionStorage.getItem('token') || ''
  // }
  return config
}, (error: any) => {
  ElNotification({
    message: '请求超时,请检查您的网络连接!',
    type: 'error',
  })
  return Promise.reject(error)
})
//响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
  //请求状态码异常提示
  response.data.sys.status != 1 ? (
    ElNotification({
      message: `${response.data.sys.msg}`,
      type: 'error',
    })
  ) : false
  return response.data
}, (error: any) => {
  ElNotification({
    message: '请求超时,请检查您的网络连接!',
    type: 'error',
  })
  return Promise.reject(error)
})
export default request