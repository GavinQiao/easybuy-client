import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // token 可以存 localStorage 同步，也可以放这里，示范放 reactive 状态
  const token = ref(localStorage.getItem('token') || '')
  const username = ref(localStorage.getItem('username') || '')
  
  function setUser(newToken: string, newUsername: string) {
    token.value = newToken
    username.value = newUsername
    localStorage.setItem('token', newToken)
    localStorage.setItem('username', newUsername)
  }

  function clearUser() {
    token.value = ''
    username.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  function isLoggedIn() {
    return !!token.value
  }

  return { token, username, setUser, clearUser, isLoggedIn }
})
