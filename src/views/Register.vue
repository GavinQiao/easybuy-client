<template>
  <MenuBar />
  <div>
    <h2>注册</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" placeholder="密码" type="password" />
    <button @click="handleRegister">注册</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { register } from '@/api/auth';
import MenuBar from '@/components/MenuBar/MenuBar.vue';

const username = ref('');
const password = ref('');

const handleRegister = async () => {
  try {
    await register(username.value, password.value);
    alert('注册成功');
  } catch (err) {
    alert('注册失败');
  }
};
</script>
