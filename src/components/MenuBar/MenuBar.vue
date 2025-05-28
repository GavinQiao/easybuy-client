<template>
    <div class="menuWrapper">
        <div class="logoWrapper">
            <img src="@/assets/logo.webp" alt="Logo">
        </div>
        <div class="menu">
            <ul>
                <li><a href="/">主页</a></li>
                <li><a href="/products">商品列表</a></li>
                <li>联系我们</li>
            </ul>
        </div>
        <div>
            <div v-if="userStore.isLoggedIn()">
                <p>欢迎，{{ userStore.username }}!</p>
                <a href="/dashboard">我的主页</a>
                <button @click="exit">登出</button>
            </div>
            <div v-else>
                <a href="/login">登录</a>
                <a href="/register">注册</a>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

    const userStore = useUserStore()

    const router = useRouter()

    const exit = () =>{
        userStore.clearUser()
        router.push('login')
    }
</script>

<style scoped>
    .menuWrapper{
        background-color: #FFF3E0;
        height: 150px;
        display: flex;
    }

    .menuWrapper div{
        flex: 1;
    }

    .menuWrapper .logoWrapper{
        padding: 25px;
    }

    .menuWrapper img{
        height: 100%;
    }

    .menu{

    }
</style>