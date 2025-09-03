<template>
    <MenuBar />
    <div class="banner-wrapper">
        <div class="banner-content">
            <p>每日新鲜，应有尽有</p>
            <h2>商品列表</h2>
        </div>
        <div class="banner-cover"></div>
    </div>
    <div></div>
    <ProductList :category="category" />
    <Footer />
</template>

<script lang="ts" setup>
import MenuBar from '@/components/MenuBar/MenuBar.vue';
import Footer from '@/components/Footer/Footer.vue';
import ProductList from '@/components/ProductList/ProductList.vue';
import { useRoute } from 'vue-router';
import {computed } from 'vue'

const route = useRoute()
const category = computed(() => route.params.category as string | undefined)


</script>

<style scoped>
    .banner-wrapper{
        display: flex;
        flex-direction: column;
        position: relative;
        height: 400px;
        background-image: url('@/assets/images/ProductPage/banner.jpg');
        background-size: cover;
        background-position: center;
    }

    .banner-cover{
        background-color: #071c1f;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.9;
        z-index: 5;
    }

    .banner-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding: 30px 120px;
        z-index: 10;
        color: white;
    }

    .banner-content h2{
        font-size: 48px;
    }

    .banner-content p{
        font-size: 24px;
    }
</style>