<template>
    <MenuBar />
    <div v-for="favorite in myFavorites">
        <h3>{{ favorite.name }}</h3>
    </div>
    <Footer />
</template>

<script lang="ts" setup>
import MenuBar from '@/components/MenuBar/MenuBar.vue';
import Footer from '@/components/Footer/Footer.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

let myFavorites = ref([])
const userStore = useUserStore()

const fetchFavorites = async () => {
    try{
        const res = await axios.get(`http://localhost:3000/favorites`,{
            headers: {Authorization: `Bearer ${userStore.token}`}
        })
        myFavorites.value = res.data.map(f => f.product)
    }catch(err){
        console.error(err)
    }
}

onMounted(()=>{
    fetchFavorites()
})
</script>

<style scoped>

</style>