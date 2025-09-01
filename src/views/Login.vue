<template>
  <div class="login-page">
    <div class="login-form-wrapper">
      <div class="side-pic">
        <img src="@/assets/images/Login-pic-removebg.png" alt="login-picture">
        <h4>每日新鲜果蔬，享受健康生活！</h4>
      </div>
      <div class="main-login">
        <img class="login-logo" src="@/assets/logo.png" alt="">
        <form>
          <label for="username">用户名：</label>
          <input v-model="username" name="username" placeholder="用户名" type="text"/>
          <label for="password">密码：</label>
          <input v-model="password" name="password" placeholder="密码" type="password" />
          <button @click="handleLogin">登录</button>
        </form>
      </div>
      
    </div>
  </div>
  
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/api/auth';
import { useUserStore } from '@/stores/user';

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

<style scoped>
.login-page{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login-form-wrapper{
    flex:1;
    display: flex;
    max-height: 500px;
    border-radius: 16px;
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
    border: 3px solid #ffb74d;
    box-shadow: 0 8px 20px rgba(255, 183, 77, 0.3);
}

.login-form-wrapper>div{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 50%;
}

.login-form-wrapper .side-pic{
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    border-radius: 16px 0 0 16px;
    background-color: #fff6db;
}

.login-form-wrapper img{
    width: 75%;
    height: auto;
    object-fit: cover;
}

.login-form-wrapper h4{
    font-size: 22px;
    color: #79644c;
}

.login-form-wrapper .main-login{
    background-color: #f5f5f5;
    padding: 30px;
    border-radius: 0 16px 16px 0;
}

.login-form-wrapper .login-logo{
    max-width: 200px;
}

.login-form-wrapper h2{
    position: relative;
}

.login-form-wrapper form button{
    padding: 10px;
    border-radius: 16px;
    background: #fff3e0;
    border: 1px solid #9d9d9d;
}

.login-form-wrapper h2::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 2px;
    width: 100%;
    background-color: black;
}

.login-form-wrapper form{
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    width: 100%;
}

.login-form-wrapper form input{
    padding: 10px 25px;
    border-radius: 15px;
    border: none;
}
</style>