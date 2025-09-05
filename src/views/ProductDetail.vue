<template>
    <MenuBar />
    <div class="breadcrumb">
        <a href="http://localhost:5173/">主页</a> / <a :href="`http://localhost:5173/products/${product.category}`">{{ product.category }}</a> / <a href="#">{{ product.name }}</a>
    </div>
    <div class="productWrapper">
        <div class="imageWrapper">
            <img :src="product.imageUrl">
        </div>
        <div class="infoWrapper">
            <h2>{{product.name}}</h2>
            <p>{{ product.originalPrice }}</p>
            <p>{{ product.discountPrice }}</p>
            <input type="number" v-model="amount">
            <button @click="purchase()">购买</button>
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
    <CartSidebar />
    <Footer />
</template>

<script lang="ts" setup>
import MenuBar from '@/components/MenuBar/MenuBar.vue';
import Footer from '@/components/Footer/Footer.vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import instance from '@/util/interceptor';
import CartSidebar from '@/components/CartSidebar/CartSidebar.vue';

const route = useRoute()

const cartStore = useCartStore()

const productId = Number(route.params.id)

const product = ref({})

const relatedProduct = ref([])

const amount = ref(0)

const getCategory = (category:string) => {
    switch (category){
        case "fruit":
            return "水果";
            break;
        case "vegetable":
            return "蔬菜";
            break;
        case "nut":
            return "干果"
            break;
        default:
            console.log("类别错误！");
    }
}

const activeTab = ref('description')

const fetchProduct = async () => {
    try{
        const resProduct = await instance.get(`/products/${productId}`)
        const resRelated = await instance.get(`/products/relevant/${productId}`)
        product.value = resProduct.data
        let cate = product.value.category
        product.value.category = getCategory(cate)
        relatedProduct.value = resRelated.data.filter(p => p.id != productId).slice(0,4)
    }catch (err){
        console.error(err)
    }
}

const tabChange = (tabName:string) => {
    activeTab.value = tabName
    console.log(activeTab.value)
}

const purchase = () => {
    cartStore.addToCart(productId,amount.value)
}

onMounted(()=>{
    fetchProduct()
})

</script>

<style scoped>
    .breadcrumb{
        max-width: 1200px;
        margin: 0 auto;
    }

    .breadcrumb a{
        font-size: 20px;
        position: relative;
        transition: all 0.3s ease;
    }

    .breadcrumb a:hover{
        color:#ff8f3c;
    }

    .breadcrumb a::after{
        content: "";
        position: absolute;
        height: 1px;
        width: 0;
        left: 0;
        bottom: 0;
        background-color: black;
        transition: all 0.3s ease;
    }

    .breadcrumb a:hover::after{
        width: 100%;
        background-color: #ff8f3c;
    }

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

    .relatedProduct img{
        width: 100%;
    }
</style>