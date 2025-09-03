// axios 拦截器
import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
        alert("请先登录！")
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance