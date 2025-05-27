<template>
  <div>
    <h2>登录</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" placeholder="密码" type="password" />
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/api/auth';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const username = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const res = await login(username.value, password.value);
    console.log(res)
    if (res.data.access_token){
      userStore.setUser(res.data.access_token,res.data.username)
      console.log("用户设置完成！")
    }
    localStorage.setItem('token', res.data.access_token);
    alert('登录成功');
  } catch (err) {
    alert('登录失败');
  }
};
</script>
