<template>
    <Swiper :modules="modules" :slides-per-view="1" :space-between="10" :pagination="{clickable:true}" :navigation="true" class="product-slider">
        <swiper-slide v-for="promo in promotions" :key="promo.id" class="product-slide">
            <img :src="promo.imageUrl" :alt="promo.name" />
            <div class="product-info">
                <h2>{{ promo.name }}</h2>
                <p>{{ promo.originalPrice }}</p>
                <p>{{ promo.discountPrice }}</p>
                <button @click="console.log('Number '+promo.id+' product has been purchased')">点击购买</button>
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
        imageUrl:new URL('@/assets/images/1.webp',import.meta.url).href
    },
    {
        id:2,
        name:"缺牙齿 锅巴 60g",
        originalPrice:3.99,
        discountPrice:0.99,
        stock:60,
        imageUrl:new URL('@/assets/images/1.webp',import.meta.url).href
    },
    {
        id:3,
        name:"步步升 南京板鸭 60g",
        originalPrice:2.99,
        discountPrice:0.99,
        stock:50,
        imageUrl:new URL('@/assets/images/1.webp',import.meta.url).href
    }
]
</script>

<style scoped>
    .product-slide{
        display: flex;
    }

    .product-slide img{
        width: 50%;

    }
</style>