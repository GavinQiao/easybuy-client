<template>
    <div class="product-list-wrapper">
        <div class="product-card" v-for="product in products" :key="product.id">
            <img :src="product.imageUrl" :alt="product.name" v-if="product.imageUrl">
            <h3>{{ product.name }}</h3>
            <p class="original">原价：{{ product.originalPrice }}</p>
            <p>折扣价：{{ product.discountPrice }}</p>
            <div class="action-wrapper">
                <button @click="toggleFavorite(product.id)">
                    {{ isFavorite(product.id) ? '取消收藏' : '加入收藏夹' }}
                </button>
                <button @click="detail()">查看详情</button>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useUserStore } from '@/stores/user';
import axios from 'axios';
    import { onMounted, ref } from 'vue';

    let products = ref([])
    const favorites = ref([])
    const userStore = useUserStore()

    const fetchProducts = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/products`);
            console.log(res.data)
            products.value = res.data
        }catch(err){
            console.error(err)
        }
    }

    const fetchFavorite = async () => {
        try{
            const res = await axios.get(`http://localhost:3000/favorites`, {
                headers: {Authorization: `Bearer ${userStore.token}`}
            })
            favorites.value = res.data.map(f => f.product.id)
        }catch(error){
            console.error(error)
        }
    }

    function isFavorite(productId) {
        return favorites.value.includes(productId)
    }

    async function toggleFavorite(productId) {
        if (isFavorite(productId)) {
            await axios.delete(`http://localhost:3000/favorites/${productId}`, {
            headers: { Authorization: `Bearer ${userStore.token}` }
            })
            favorites.value = favorites.value.filter(id => id !== productId)
        } else {
            await axios.post(`http://localhost:3000/favorites/${productId}`, {}, {
            headers: { Authorization: `Bearer ${userStore.token}` }
            })
            favorites.value.push(productId)
        }
    }

    onMounted(()=>{
        fetchProducts()
        fetchFavorite()
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