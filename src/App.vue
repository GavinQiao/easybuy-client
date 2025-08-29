<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { isTokenExpired } from '@/util/jwt'

const userStore = useUserStore()

if (userStore.token && isTokenExpired(userStore.token)) {
  userStore.clearUser()
  window.location.href='/login'
}
</script>

<template>
  <router-view />
</template>

