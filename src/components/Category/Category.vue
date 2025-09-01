<template>
    <div class="cate-wrapper">
        <div class="cate-box cate1">
            <h3>甄选全球鲜果，尽享天然本味。</h3>
            <a href="#"><span class="text">点击开启健康生活</span><span class="arrow">→</span></a>
        </div>
        <div class="cate-box cate2">
            <h3>田园臻选，鲜绿本真。</h3>
            <a href="#"><span class="text">点击开启健康生活</span><span class="arrow">→</span></a>
        </div>
        <div class="cate-box cate3">
            <h3>五谷精粹，滋养日常。</h3>
            <a href="#"><span class="text">点击开启健康生活</span><span class="arrow">→</span></a>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .cate-wrapper{
        display: flex;
        justify-content: center;
        height: 188px;
        margin: 50px 0;
        gap: 20px;
    }

    .cate-box{
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: end;
        flex: 1;
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 0.3s ease;
    }

    .cate1{
        background-image: url('@/assets/images/cate1.png');
    }

    .cate2{
        background-image: url('@/assets/images/cate2.png');
    }

    .cate3{
        background-image: url('@/assets/images/cate3.png');
    }

    .cate-box:hover{
        transform: scale(1.1);
    }

    .cate-box a{
        position: relative;
        margin: 10px 20px 40px 0;
        text-decoration: none;
        color: black;
        background-color: #ff8f3c;
        border-radius: 10px;
        width: 140px;
        height: 35px;
        overflow: hidden;
    }

    .cate-box a span{
        position: absolute;
        transition: all 0.3s ease;
        transform: translateX(0);
    }

    .cate-box a .text{
        top: 5px;
        left: -100%;
    }

    .cate-box a .arrow{
        top: 0;
        left: 65px;
        font-size: 24px;
    }

    .cate-box a:hover span{
        transform: translateX(145px);
    }
</style>