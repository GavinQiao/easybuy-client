<template>
    <div class="footerWrapper">
        <div>Logo简介</div>
        <div>快捷菜单</div>
        <div>联系表单</div>
        <div>
            <button @click="openCart" class="px-4 py-2 bg-blue-500 text-white rounded">
                🛒 查看购物车
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useCartStore } from '@/stores/cart';
    const cartStore = useCartStore();

    const openCart = () => {
        cartStore.fetchCart(); // 可选：每次打开时刷新
        cartStore.toggleSidebar();
    };
</script>

<style scoped>
    .footerWrapper{
        background-color: #FFF3E0;
        height: 200px;
        display: flex;
    }

    .footerWrapper div{
        flex: 1;
    }
</style>