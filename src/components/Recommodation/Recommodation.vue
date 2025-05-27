<template>
    <div class="reccommodation-wrapper">
    <h2>Today Special</h2>
    <div class="special-wrapper">
      <div class="special-box" v-for="seller in bestSellers" :key="seller.id">
        <h4>{{ seller.name }}</h4>
        <img :src="seller.imageUrl" alt="商品图片" v-if="seller.imageUrl" />
        <span>{{ seller.originalPrice }}</span>
        <span>{{ seller.discountPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
    import axios from 'axios'
    import { onMounted,ref } from 'vue'

    const imageLoaded = ref(false)

    const bestSellers = ref([])

    const getBestSellers = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/products/best-seller`)
            bestSellers.value = res.data
            console.log(res.data)
        }catch(err){
            
        }
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
        getBestSellers()
    })
</script>

<style scoped>
    .reccommodation-wrapper{
        margin: 0 10%;
    }

    .special-wrapper{
        display: flex;
        gap: 15px;
        flex-direction: row;
        justify-content: space-between;
    }

    .special-wrapper .special-box{
        flex: 1;
        background-color: #ededed;
        padding: 20px 40px;
        border: 1px solid #b0b0b0;
        border-radius: 5px;
    }

    .special-box img{
        width: 100%;
    }
</style>