<template>
    <div class="product-list-wrapper">
        <div class="product-card" v-for="product in products" :key="product.id">
            <img :src="product.imageUrl" :alt="product.name" v-if="product.imageUrl">
            <h3>{{ product.name }}</h3>
            <p class="original">原价：{{ product.originalPrice }}</p>
            <p>折扣价：{{ product.discountPrice }}</p>
            <div class="action-wrapper">
                <button @click="addToCart(product.id)">添加至购物车</button>
                <button @click="detail()">查看详情</button>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';

    let products = ref([])

    const fetchProducts = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/products`);
            console.log(res.data)
            products.value = res.data
        }catch(err){
            console.error(err)
        }
    }

    onMounted(()=>{
        fetchProducts()
    })
    
</script>

<style scoped>
    .product-list-wrapper{
        display: flex;
        flex-wrap: wrap;
        padding: 0 200px;
        gap: 25px;
    }

    .product-card{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 23%;
        padding: 30px 30px 50px 30px;
        border: solid 3px white;
        transition: border-color 0.3s ease-in-out;
    }

    .product-card:hover{
        border: 3px solid #ededed;
    }

    .product-card h3,.product-card p{
        text-align: center;
    }

    .product-card p{
        margin: 10px 0;
    }

    .product-card .action-wrapper{
        display: flex;
        justify-content: center;
        gap: 25px;
        margin-top: 15px;
    }

    .product-card .action-wrapper button{
        background-color: #b7b7b7;
        color:white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .product-card .action-wrapper button:hover{
        background-color: #ff8f3c;
    }

    .product-card:hover button{
        opacity: 1;
    }

    .product-card .original{
        text-decoration: line-through;
    }
</style>