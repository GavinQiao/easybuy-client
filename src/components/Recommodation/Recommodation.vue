<template>
    <div class="reccommodation-wrapper">
        <h2 class="recommondation-title">今日特惠</h2>
    <div class="special-wrapper">
      <div class="special-box" v-for="seller in bestSellers" :key="seller.id">
        <div class="upper-slider">
            <p>{{ seller.description }}</p>
        </div>
        <img :src="seller.imageUrl" alt="商品图片" v-if="seller.imageUrl" />
        <div class="info-box">
            <h4>{{ seller.name }}</h4>
            <span class="discount">￥{{ seller.discountPrice }}</span>
            <span class="origin">￥{{ seller.originalPrice }}</span>
        </div>
        <div class="lower-slider">
            <div class="purchase">
                <input type="number" name="purchase" placeholder="请输入数量">
                <button><img style="padding:5px;max-width: 20px;max-height:20px;object-fit: contain;" src="@/assets/icons/search.png" alt=""></button>
            </div>
        </div>
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
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .special-wrapper{
        display: flex;
        gap: 15px;
        flex-direction: row;
        justify-content: space-between;
    }

    .recommondation-title{
        font-size: 32px;
        text-align: center;
        margin: 40px auto;
        position: relative;
    }

    .recommondation-title::after{
        content: "";
        background-color: #7fb401;
        height: 2px;
        width: 100%;
        position: absolute;
        display: inline-block;
        left: 0;
        bottom: -10px;
    }

    .special-wrapper .special-box{
        flex: 1;
        background-color: #fff3dc;
        position: relative;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        overflow: hidden;
    }

    .info-box{
        background-color: white;
        padding: 20px 40px;
    }

    .special-box img{
        width: 100%;
    }

    .special-box h4{
        font-size: 24px;
        font-weight: bold;
    }

    .special-box .discount{
        font-size: 20px;
        margin-right: 5px;
    }

    .special-box .origin{
        font-size: 16x;
        text-decoration: line-through;
        color: #b0b0b0;
    }

    .upper-slider,
    .lower-slider{
        position: absolute;
        
        width: 100%;
        transition: all 0.3s ease;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .upper-slider{
        transform: translateY(-100%);
        height: 75%;
        background-color: #ffffffa8;
    }

    .upper-slider p{
        margin: 0 25px;
        
    }

    .lower-slider{
        transform: translateY(0);
        background-color: #7fb401;
        height: 25%;
    }

    .special-box:hover .upper-slider{
        transform: translateY(0);
    }

    .special-box:hover .lower-slider{
        transform: translateY(-100%);
    }

    .purchase{
        position: relative;
        display: flex;
        height: 35px;
    }

    .lower-slider input{
        border-radius: 20px 0 0 20px;
        border: 1px solid #363636;
        padding: 0 25px;
    }

    .lower-slider button{
        height: 35px;
        width: 50px;
        border-radius: 0 20px 20px 0;
        border: 1px solid #363636;
    }
</style>