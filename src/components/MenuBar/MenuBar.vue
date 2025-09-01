<template>
    <div class="menuWrapper">
        <div class="logoWrapper">
            <img src="@/assets/logo.png" alt="Logo">
        </div>
        <div class="menu">
            <ul>
                <li><a href="/">主页</a></li>
                <li><a href="/products">商品列表</a></li>
                <li><a href="/products">商品列表</a></li>
                <li><a href="/aboutus">联系我们</a></li>
            </ul>
        </div>
        <div class="admin-wrapper">
            <div v-if="userStore.isLoggedIn()">
                <p>欢迎，{{ userStore.username }}!</p>
                <a href="/dashboard">我的主页</a>
                <button @click="exit">登出</button>
            </div>
            <div class="admin-button" v-else>
                <div>
                    <p><span><a class="login" href="/login">登录</a></span> / <span><a class="register" href="/register">注册</a></span></p>
                </div>
                <div class="search-wrapper">
                    <button><img style="padding:5px;max-width: 20px;max-height:20px;object-fit: contain;" src="@/assets/icons/search.png" alt=""></button>
                    <input type="text" name="search">
                </div>
                
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
        height: 100px;
        display: flex;
    }

    .menuWrapper .logoWrapper{
        width: 20%;
        padding: 5px;
    }

    .menuWrapper img{
        height: 100%;
    }

    .menu{
        width: 60%;
        vertical-align: middle;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .menu ul{
        display: flex;
    }

    .menu li{
        flex: 1;
        list-style: none;
    }

    .menu li a{
        font-family: "Source Han Serif", serif;
        font-size: 24px;
        text-decoration: none;
        color: black;
        position: relative;
        transition: all 0.3s ease;
    }

    .menu li a::after{
        content: "";
        position: absolute;
        display: inline-block;
        height: 1px;
        width: 0;
        left: 0;
        bottom: 0;
        background-color: black;
        transition:all 0.3s ease;
    }

    .menu li a:hover{
        color: #363636;
    }

    .menu li a:hover::after{
        width: 100%;
        background-color: #363636;
    }

    .admin-wrapper{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .admin-wrapper p,
    .admin-wrapper a{
        font-family: "Source Han Serif", serif;
        font-size: 20px;
    }

    .admin-wrapper a{
        color: black;
        text-decoration: none;
    }

    .admin-wrapper a::after{
        content: "";
        position: absolute;
        display: inline-block;
        height: 1px;
        width: 0;
        left: 0;
        bottom: 0;
        background-color: black;
        transition:all 0.3s ease;
    }

    .admin-wrapper a:hover{
        color:#363636;
    }

    .admin-wrapper a:hover::after{
        background-color: #363636;
        width: 100%;
    }

    .admin-wrapper .admin-button{
        display: flex;
        flex-direction: column;
    }

    .admin-wrapper .admin-button span{
        position: relative;
    }

    .admin-wrapper .search-wrapper{
        position: relative;
        display: flex;
    }

    /*搜索栏*/
    .admin-wrapper input{
        border-radius: 0 20px 20px 0;
        border: 1px solid #363636;
    }

    .admin-wrapper button{
        height: 35px;
        width: 50px;
        border-radius: 20px 0 0 20px;
        border: 1px solid #363636;
    }
</style>