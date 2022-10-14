/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// JSON.parse()
// JSON.stringify()

// JSONBing.parse() // 把JSON 格式的字符串转为JavaScript 对象
// JSONBing.stringify() // 把JavaScript 对象转为JSON 格式的字符串

// import qs from 'qs'

const request = axios.create({
  // baseURL: 'http://www.liulongbin.top:8000' // 接口的基准路径
  // baseURL: 'http://toutiao.itheima.net/',
  baseURL: 'http://toutiao.itheima.net/',

  // 自定义后端返回的原始数据
  // data:后端返回的原始数据，说白了就是JSON格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
})

// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config 配置对象：本次请求的请求配置对象
  // console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意：这里务必要返回config配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会经过这里
  return Promise.reject(error)
})

// 响应拦截器

export default request
