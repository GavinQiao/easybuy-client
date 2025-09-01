<template>
    <div class="title-wrapper">
        <h2 class="promotion-title">畅销热品</h2>
    </div>
    <Swiper :modules="modules" :slides-per-view="2" :space-between="10" :pagination="{clickable:true}" :navigation="true" class="product-slider">
        <swiper-slide v-for="promo in promotions" :key="promo.id" class="product-slide">
            <div class="image-wrapper">
                <img :src="promo.imageUrl" :alt="promo.name" />
                <div class="info-wrapper"></div>
            </div>
            <div class="description">
                <h2>{{ promo.name }}</h2>
                <p>{{ promo.originalPrice }}</p>
                <p>{{ promo.discountPrice }}</p>
                <button @click="console.log('Number '+promo.id+' product has been purchased')">点击购买</button>
            </div>
            <div class="info">
                <p>{{ promo.description }}</p>
            </div>
            
            
        </swiper-slide>
    </Swiper>

</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {Swiper,SwiperSlide} from 'swiper/vue';
import { Navigation,Pagination } from 'swiper/modules';


const modules = [Navigation,Pagination]

const promotions = [
    {
        id:1,
        name:"骰子+筛盅",
        originalPrice:6.99,
        discountPrice:1.99,
        stock:99,
        imageUrl:new URL('@/assets/images/1.webp',import.meta.url).href,
        description: "这里是商品描述。"
    },
    {
        id:2,
        name:"缺牙齿 锅巴 60g",
        originalPrice:3.99,
        discountPrice:0.99,
        stock:60,
        imageUrl:new URL('@/assets/images/1.webp',import.meta.url).href,
        description: "这里是商品描述。"
    },
    {
        id:3,
        name:"步步升 南京板鸭 60g",
        originalPrice:2.99,
        discountPrice:0.99,
        stock:50,
        imageUrl:new URL('@/assets/images/1.webp',import.meta.url).href,
        description: "这里是商品描述。"
    }
]
</script>

<style scoped>
    .title-wrapper{
        position: relative;
        display: flex;
        justify-content: center;
        margin: 40px auto;
    }

    .promotion-title{
        display: inline-block;
        position: relative;
    }

    .promotion-title::after{
        content: "";
        background-color: #7fb401;
        height: 2px;
        width: 100%;
        position: absolute;
        display: inline-block;
        left: 0;
        bottom: -10px;
    }

    .product-slider{
        margin-bottom: 100px;
    }

    .product-slide{
        display: flex;
        position: relative;
        overflow: hidden;
        height: 500px;
        justify-content: center;
    }

    .product-slide img{
        width: 100%;
        height: 100%;
    }

    .info-wrapper,
    .description,
    .info{
        position: absolute;
        color: white;
    }

    .info-wrapper{
        height: 100%;
        width: 100%;
        top: 0;
        background-color: black;
        transition: all 0.3s ease;
        opacity: 0;
    }

    .product-slide:hover .info-wrapper{
        opacity: 0.2;
    }

    .image-wrapper{
        position: relative;
    }

    .description{
        background-color: rgba(0, 0, 0, 0.541);
        padding: 25px;
        left: 0;
        top: 0;
        width: 250px;
        height: 100px;
        transform: translate(-100%,-100%);
        transition: all 0.3s ease;
    }

    .product-slide:hover .description{
        transform: translate(100%,160%);
    }

    .info{
        background-color: rgba(0, 0, 0, 0.541);
        padding: 25px;
        right: 0;
        bottom: 0;
        transform: translate(100%,100%);
        transition: all 0.3s ease;
        width: 250px;
    height: 100px;
    }

    .product-slide:hover .info{
        transform: translate(-100%,-160%);
    }
</style>