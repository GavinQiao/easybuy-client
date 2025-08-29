<!-- components/CartSidebar.vue -->
<template>
  <div
    class="cartWrapper"
    :class="{ 'translate-x-0': cartStore.showSidebar, 'translate-x-full': !cartStore.showSidebar }"
  >
    <div>
      购物车
      <button @click="cartStore.toggleSidebar">关闭 ✖</button>
    </div>
    <div class="p-4">
      <div v-if="cartStore.cartItems.length === 0">购物车为空</div>
      <div v-else>
        <ul>
          <li v-for="item in cartStore.cartItems" :key="item.product.id" class="mb-2">
            {{ item.product.name }} × {{ item.quantity }}
          </li>
        </ul>
        <button @click="checkout" class="w-full py-2 bg-green-500 text-white rounded">
          💳 结账并创建订单
        </button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useCartStore } from '@/stores/cart';
import { loadStripe } from '@stripe/stripe-js';

const cartStore = useCartStore();

const stripePromise = loadStripe('pk_test_51RUoPD2LMYDRfRdx3UTK0NgCHSRBIFeaNH4IrUBtedhzVtR0mOSmq7Y3mF0Q8VPXpzOHuBdsf8KcVt94TDRXLyBK00lF0d3K2x')

const checkout = async () => {
  const token = localStorage.getItem('token');
  try {
    const res_order = await axios.post('http://localhost:3000/orders/checkout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert(`订单创建成功，订单号：${res_order.data.id}`);
    const res_stripe = await axios.post('http://localhost:3000/stripe/create-checkout-session', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: res_stripe.data.url.split('/').pop() });
    cartStore.cartItems = []; // 清空前端购物车状态
    cartStore.toggleSidebar();
  } catch (err) {
    alert('结账失败，请重试');
    console.error(err);
  }
};
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
    z-index: 99;
}

/* 初始 translate-x-full 为右移隐藏状态 */
.translate-x-full {
  transform: translateX(100%);
}
.translate-x-0 {
  transform: translateX(0);
}
</style>
