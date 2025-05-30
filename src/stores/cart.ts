import { defineStore } from "pinia";
import axios from "axios";

export interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    // 可根据实际情况扩展
  };
  quantity: number;
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        showSidebar : false,
        cartItems: [] as CartItem[], // 存储购物车商品
    }),
    actions: {
        toggleSidebar() {
            this.showSidebar = !this.showSidebar;
        },
        
        async addToCart(productId: number, quantity = 1) {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/cart/add', { productId, quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await this.fetchCart();
        },

        async fetchCart() {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:3000/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.cartItems = res.data;
        }
    }
});
