import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ProductPage from '@/views/ProductPage.vue'
import Dashboard from '@/views/Dashboard.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import About from '@/views/About.vue'
import Success from '@/views/Success.vue'
import Failed from '@/views/Failed.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductPage
  },
  {
    path: '/products/:category',
    name: 'ProductsCategory',
    component: () => import('@/views/ProductPage.vue'),
    props: true
  },
  {
    path: '/products/details/:id',
    component: ProductDetail,
    props: true
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/aboutus',
    component: About
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/success',
    component:Success
  },
  {
    path:'/cancel',
    component:Failed
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')  // 或者从 pinia 取

  if (to.meta.requiresAuth && !token) {
    // 未登录，重定向到 login
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
