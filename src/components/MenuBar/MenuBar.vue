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
            <a href="/login">登录</a>
            <a href="/register">注册</a>
        </div>
    </div>
</template>

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