<template>
    <MenuBar />
  <div v-if="userStore.isLoggedIn()">
    <p>欢迎您，{{ userStore.username }}</p>
    <button @click="exit">登出</button>
  </div>
  <div v-else>
    <p>欢迎您，请登录！</p>
  </div>
  <div class="banner-wrapper">
    <div class="banner-background" :class="{ loaded: imageLoaded }"></div>
    <div class="banner-content">
      <h2>Welcome to Easybuy!</h2>
      <p>We offer fresh food for your daily life! Check out Everyday Sales products!</p>
      <button>Start Shopping</button>
    </div>
  </div>

  <Recommodation />

  <PromotionBanner />

  <Subscription />

  <Footer />
  
</template>

<script setup lang="ts">
  import Footer from '@/components/Footer/Footer.vue';
import MenuBar from '@/components/MenuBar/MenuBar.vue';
import PromotionBanner from '@/components/PromotionBanner/PromotionBanner.vue'
  import Recommodation from '@/components/Recommodation/Recommodation.vue';
import Subscription from '@/components/Subscription/Subscription.vue';
  import { onMounted,ref } from 'vue';
  import {useRouter} from 'vue-router';
  import { useUserStore } from '@/stores/user';
import ProductList from '@/components/ProductList/ProductList.vue';

  const imageLoaded = ref(false)

  const userStore = useUserStore()

  const router = useRouter()

  const exit = () => {
    userStore.clearUser()
    router.push('login')
  }

  onMounted(() => {
        const img = new Image()
        img.src = new URL('../assets/home-banner.webp', import.meta.url).href
        img.onload = () => {
        // 图片加载完成时回调
            const el = document.querySelector('.banner-background')
            el.style.backgroundImage = `url('${img.src}')`
            imageLoaded.value = true
        }
    })
</script>


<style scoped>
  .banner-wrapper{
        position: relative;
        display: flex;
    }

    .banner-background{
        height: 600px;
        width: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        z-index: -10;
    }

    .banner-background::after{
        content: '';
        display: inline-block;
        position:absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: black;
        opacity: 0.4;
        z-index: 0;
    }

    .banner-background.loaded {
        opacity: 1; /* 淡入显示 */
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

</style>  