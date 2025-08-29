<template>
  <div class="login-form-wrapper">
    <div class="side-pic">
      <img src="@/assets/images/Login-pic-removebg.png" alt="login-picture">
      <h4>每日新鲜果蔬，享受健康生活！</h4>
    </div>
    <div class="main-login">
      <img class="login-logo" src="@/assets/logo.webp" alt="">
      <form>
        <label for="username">用户名：</label>
        <input v-model="username" name="username" placeholder="用户名" type="text"/>
        <label for="password">密码：</label>
        <input v-model="password" name="password" placeholder="密码" type="password" />
        <button @click="handleLogin">登录</button>
      </form>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/api/auth';
import { useUserStore } from '@/stores/user';

import '@/views/Login/Login.css';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const username = ref('');
const password = ref('');

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await login(username.value, password.value);
    console.log(res)
    if (res.data.access_token){
      userStore.setUser(res.data.access_token,res.data.username)
      console.log("用户设置完成！")
    }
    localStorage.setItem('token', res.data.access_token);
    alert('登录成功');
    router.push('/');
  } catch (err) {
    alert('登录失败');
  }
};
</script>
