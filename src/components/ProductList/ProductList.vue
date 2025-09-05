<template>
    <div class="product-list-wrapper">
        <transition name="fade-slide" mode="out-in">
            <div class="grid-wrapper" :key="currentPage">
                <div class="product-card" v-for="product in paginatedProducts" :key="product.id">
                    <button class="fav-button" @click="toggleFavorite(product.id)">
                        <i :class="isFavorite(product.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
                    </button>
                    <img :src="product.imageUrl" :alt="product.name" v-if="product.imageUrl">
                    <div class="product-info">
                        <a :href="`/products/details/${product.id}`"><h3>{{ product.name }}</h3></a>
                        <p class="original">原价：{{ product.originalPrice }}</p>
                        <p class="discount">折扣价：{{ product.discountPrice }}</p>
                        <div>
                            <div class="purchase">
                                <input type="number" name="purchase" placeholder="请输入数量">
                            </div>
                            <div class="action-wrapper">
                                <button @click="">添加至购物车</button>
                                <button @click="purchase(product.id)">立刻购买</button>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </div>
        </transition>
    </div>

    <div class="pagination">
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="products.length"
        />
    </div>
</template>

<script lang="ts" setup>
    import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import instance from '@/util/interceptor';
    import { onMounted, ref, computed,watch } from 'vue';

    let products = ref([])
    const favorites = ref([])
    const userStore = useUserStore()
    const cartStore = useCartStore()

    const pageSize = 4
    const currentPage = ref(1)

    const props = defineProps<{
        category?: string
    }>()

    const paginatedProducts = computed(() => {
        const start = (currentPage.value - 1) * pageSize
        return products.value.slice(start, start + pageSize)
    })

    const fetchProducts = async () => {
        let res
        if (props.category){
            res = await instance.get(`/products/category/${props.category}`)
        }else{
            res = await instance.get('/products')
        }
        products.value = res.data
    }

    const fetchFavorite = async () => {
        try{
            const res = await instance.get(`http://localhost:3000/favorites`, {
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
            await instance.delete(`http://localhost:3000/favorites/${productId}`, {
            headers: { Authorization: `Bearer ${userStore.token}` }
            })
            favorites.value = favorites.value.filter(id => id !== productId)
        } else {
            await instance.post(`http://localhost:3000/favorites/${productId}`, {}, {
            headers: { Authorization: `Bearer ${userStore.token}` }
            })
            favorites.value.push(productId)
        }
    }

    const purchase = async (id:number) => {
        await cartStore.addToCart(id,1)
        alert("添加至购物车")
    }

    onMounted(()=>{
        fetchProducts()
        fetchFavorite()
    })

    watch(() => props.category, () => {
        fetchProducts()
    })
    
</script>

<style scoped>
    .product-list-wrapper{
        display: flex;
        flex-wrap: wrap;
        margin-top: 50px;
        padding: 0 200px;
        gap: 25px;
    }

    .product-card{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        padding: 30px 30px 80px 30px;
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
        transition: all 0.3s ease-in-out;
    }

    .product-card .action-wrapper button:hover{
        background-color: #ff8f3c;
    }

    .product-card:hover .purchase,
    .product-card:hover .action-wrapper{
        opacity: 1;
    }

    .product-card:hover .purchase{
        top: 100px;
    }

    .product-card:hover .action-wrapper{
        top: 130px;
    }

    .product-card .original{
        text-decoration: line-through;
        color: #9c9c9c;
        font-weight: bold;
        font-size: 14px;
    }

    .product-card .discount{
        color: #ff8f3c;
        font-weight: bold;
        font-size: 16px;
    }

    .pagination{
        padding: 40px 200px;
        margin-bottom: 50px;
    }

    ::v-deep(.el-pagination .el-pager li) {
        color: black;
        transition: all 0.3s ease;
    }

    ::v-deep(.el-pagination .el-pager li:hover) {
        background-color: #ff8f3c;
        color: white;
    }

    .grid-wrapper {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 16px;
    }

    .fade-slide-enter-from,
    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(20px);
    }
    .fade-slide-enter-to,
    .fade-slide-leave-from {
        opacity: 1;
        transform: translateY(0);
    }
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.5s ease;
    }

    .fav-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 24px; /* 控制大小 */
        color: red;      /* 已收藏时显示红色 */
    }

    .fav-button i{
        display: flex;
        justify-content: end;
    }

    .product-info{
        position: relative;
        text-align: center;
    }

    .product-info a{
        position:relative;
        display: inline-block;
        color: #7fb401;
        text-decoration: none;
        font-size: 18px;
        margin: 0 auto;
    }

    .product-info a::after{
        content: "";
        position: absolute;
        display: inline-block;
        width: 0;
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: #ff8f3c;
        transition: all 0.3s ease;
    }

    .product-info a:hover::after{
        width: 100%;
    }

    .purchase,
    .action-wrapper{
        position: absolute;
        opacity: 0;
        display: flex;
        height: 35px;
        transition: all 0.3s ease;
        width: 100%;
    }

    .purchase{
        top:0;
    }

    .action-wrapper{
        top: 30px;
    }

    .purchase input{
        border-radius: 20px;
        border: 1px solid #363636;
        padding: 0 25px;
        width: 100%;
    }
</style>