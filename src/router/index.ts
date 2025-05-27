import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ProductPage from '@/views/ProductPage.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/products',
    component: ProductPage
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/register',
    component:Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
