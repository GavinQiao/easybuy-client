<template>
    <MenuBar />
  <div class="banner-wrapper">
    <div :style="{ zIndex: zIndex }" class="banner-cover">
      <div v-for="(block,index) in blocks" :key="index" :style="{ opacity: block.visible ? 1 : 0 }"></div>
    </div>
    <div class="banner-background"></div>
    <div class="banner-overlay"></div>
    <div class="banner-content">
      <h2 class="slide-in-1">欢迎来到今日易购</h2>
      <p class="slide-in-2">每日新鲜蔬果供应！祝您健康绿色生活！</p>
    </div>
  </div>

  <CartSidebar />

  <Recommodation />

  <Category />

  <PromotionBanner />

  <Subscription />

  <CartSidebar />

  <Footer />
  
</template>

<script setup lang="ts">
import CartSidebar from '@/components/CartSidebar/CartSidebar.vue';
import Category from '@/components/Category/Category.vue';
import Footer from '@/components/Footer/Footer.vue';
import MenuBar from '@/components/MenuBar/MenuBar.vue';
import PromotionBanner from '@/components/PromotionBanner/PromotionBanner.vue'
  import Recommodation from '@/components/Recommodation/Recommodation.vue';
import Subscription from '@/components/Subscription/Subscription.vue';
  import { onMounted,ref } from 'vue';

  const imageLoaded = ref(false)

  const zIndex = ref(1)
  const blocks = ref([
    {visible:true},
    {visible:true},
    {visible:true},
    {visible:true}
  ])

  onMounted(() => {
    blocks.value.forEach((block, index) => {
    setTimeout(() => {
      block.visible = false
    }, index * 300)
  })
  setTimeout(() => {
    zIndex.value = -10
  }, 1200)

    })
</script>


<style scoped>
  .banner-wrapper{
        position: relative;
        display: flex;
        height: 600px;
        width: 100%;
    }

    .banner-wrapper .banner-cover{
      height: 100%;
      width: 100%;
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      z-index: 5;
    }

    .banner-wrapper .banner-cover div{
      background-color: white;
      opacity:1;
      flex: 1 1 50%;
      transition: all 0.3s ease-in-out;
    }

    .banner-background{
        height: 600px;
        width: 100%;
        position: relative;
        background-image: url('../assets/images//Home/home-banner.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: -10;
    }

    .banner-overlay{
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
    }

    .banner-content{
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        width: 100%;
        height: 100%;
        padding: 0 10%;
        z-index: 3;
        color: white;
        font-family: 'Poppins', sans-serif;
    }
    
    .banner-content h2{
        font-size: 48px;
    }

    .banner-content p{
        font-size: 24px;
    }

    .banner-content button{
        width: 300px;
        padding: 10px 30px;
    }

    .slide-in-1,
    .slide-in-2{
      opacity:0;
      transform: translateX(-20%);
      transition: all 2s ease-in-out;
      animation:slideIn 2s forwards;
    }

    .slide-in-2{
      animation-delay: 2s;
    }

    @keyframes slideIn {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

</style>  