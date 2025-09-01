<template>
    <div class="subscriptionWrapper">
        <div class="image-wrapper">
            <img src="@/assets/images/subscription.png" alt="">
        </div>
        <div class="content-wrapper">
            <h2>新鲜好物,每日更新！</h2>
            <p>订阅我们的频道以接收每日的产品上新！</p>
            <button>现在加入！</button>
        </div>
        
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
    .subscriptionWrapper{
        display: flex;
        padding: 20px 50px;
        height: 400px;
        background-color: aliceblue;
    }

    .subscriptionWrapper>div{
        flex: 1;
        height: 100%;
    }

    .image-wrapper,
    .content-wrapper{
        display: flex;
        justify-content: center;
        width: 50%;
    }

    .image-wrapper img{
        width: auto;
        height: 100%;
        object-fit: cover;
    }

    .content-wrapper{
        flex-direction: column;
        gap: 25px;
    }

    .content-wrapper button{
        width: 50%;
        background-color: #ff8f3c;
        border: none;
        border-radius: 10px;
        padding: 5px 15px;
    }
    
    .subscriptionWrapper h2{
        font-size: 42px;
    }

    .subscriptionWrapper p{
        font-size: 24px;
    }

    .subscriptionWrapper button{
        font-size: 18px;
    }
</style>