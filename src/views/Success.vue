<template>
    <MenuBar />
    <div>
        订单已下达！您的商品正在处理中，请您耐心等候~
        <button @click="clearCart">清空购物车并返回首页</button>
    </div>
    <Footer />
</template>

<script setup>
    import MenuBar from '@/components/MenuBar/MenuBar.vue';
    import Footer from '@/components/Footer/Footer.vue';
    import { ref, onMounted } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import axios from "axios";
import instance from '@/util/interceptor';

    const route = useRoute();
    const router = useRouter();
    const orderId = ref(null);

    onMounted(() => {
    // stripe checkout 成功后，我们可以从 redirect URL 获取订单号
        orderId.value = route.query.orderId || "未知";
    });

    const clearCart = async () => {
        try {
            await instance.post("/cart/clear"); // 清空购物车
            router.push("/"); // 返回首页
        } catch (err) {
            console.error("清空购物车失败", err);
        }
    };
</script>

<style scoped>

</style>