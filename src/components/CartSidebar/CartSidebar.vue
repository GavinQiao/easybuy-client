<!-- components/CartSidebar.vue -->
<template>
  <div
    class="cartWrapper"
    :class="{ 'translate-x-0': cartStore.showSidebar, 'translate-x-full': !cartStore.showSidebar }"
  >
    <div class="p-4 border-b font-bold flex justify-between items-center">
      购物车
      <button @click="cartStore.toggleSidebar">关闭 ✖</button>
    </div>
    <div class="p-4">
      <div v-if="cartStore.cartItems.length === 0">购物车为空</div>
      <ul v-else>
        <li v-for="item in cartStore.cartItems" :key="item.product.id" class="mb-2">
          {{ item.product.name }} × {{ item.quantity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore();
</script>

<style scoped>
.cartWrapper{
    position: fixed;
    width: 300px;
    height: 100%;
    background: pink;
    top: 0;
    right: 0;
    transition: transform 0.3s ease-in-out;
}

/* 初始 translate-x-full 为右移隐藏状态 */
.translate-x-full {
  transform: translateX(100%);
}
.translate-x-0 {
  transform: translateX(0);
}
</style>
