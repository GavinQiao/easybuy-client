<template>
    <MenuBar />
    <div class="productWrapper">
        <div class="imageWrapper">
            <img :src="product.imageUrl">
        </div>
        <div class="infoWrapper">
            <h2>{{product.name}}</h2>
            <p>{{ product.originalPrice }}</p>
            <p>{{ product.discountPrice }}</p>
            <input type="number" value="2">
            <button>购买</button>
        </div>
    </div>
    <div>
        <div class="productTab">
            <div class="tabWrapper">
                <div :class="{ active: activeTab === 'description' }" @click="tabChange('description')">商品简介</div>
                <div :class="{ active: activeTab === 'size' }" @click="tabChange('size')">规格信息</div>
                <div :class="{ active: activeTab === 'review' }" @click="tabChange('review')">顾客评价</div>
            </div>
            <div class="contentWrapper">
                <div v-show="activeTab === 'description'" >这里是商品简介信息</div>
                <div v-show="activeTab === 'size'">这里是商品规格信息</div>
                <div v-show="activeTab === 'review'">这里是顾客评价</div>
            </div>
        </div>
    </div>
    <div class="relatedProduct">
        <div v-for="product in relatedProduct" :key="product.id">
            <img :src='product.imageUrl'>
            <h3>{{ product.name }}</h3>
        </div>
    </div>
    <Footer />
</template>

<script lang="ts" setup>
import MenuBar from '@/components/MenuBar/MenuBar.vue';
import Footer from '@/components/Footer/Footer.vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute()

const productId = route.params.id

const product = ref({})

const relatedProduct = ref([])

const activeTab = ref('description')

const fetchProduct = async () => {
    try{
        const resProduct = await axios.get(`http://localhost:3000/products/${productId}`)
        const resRelated = await axios.get(`http://localhost:3000/products`)
        product.value = resProduct.data
        relatedProduct.value = resRelated.data.filter(p => p.id != productId).slice(0,4)
        console.log(relatedProduct.value)
    }catch (err){
        console.error(err)
    }
}

const tabChange = (tabName:string) => {
    activeTab.value = tabName
    console.log(activeTab.value)
}

onMounted(()=>{
    fetchProduct()
})

</script>

<style scoped>
    .productWrapper{
        display: flex;
        max-width: 1200px;
        padding: 100px 0;
        margin: 0 auto;
    }

    .productWrapper .imageWrapper{
        width: 50%;
    }

    .productTab{
        max-width: 1200px;
        margin: 0 auto;
        margin-bottom: 60px;
    }

    .productTab .tabWrapper{
        display: flex;
    }

    .productTab .contentWrapper{
        width: 100%;
        padding: 50px;
        border: 2px solid #ededed;
    }

    .productTab .tabWrapper>div{
        border: 2px solid #ededed;
        border-bottom-color: white;
        border-radius: 5px 5px 0 0;
        padding: 10px 30px;
        transition: all 0.3s ease-in-out;
    }

    .productTab .tabWrapper>div:hover{
        background-color: #ffb882;
    }

    .productTab .tabWrapper .active{
        background-color: #ff8f3c;
        color: white;
    }

    .relatedProduct{
        display: flex;
        gap: 50px;
        max-width: 1200px;
        margin: 0 auto;
        margin-bottom: 60px;
    }
</style>