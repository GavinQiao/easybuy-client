<template>
    <MenuBar />
    <div class="aboutBanner" :class="{ loaded: imageLoaded }">
        <div class="aboutBackground">
            <h2>Here is the title</h2>
            <p>Here is the subtitle</p>
        </div>
        <div class="bannerOverlay"></div>
    </div>
    <div class="descriptionWrapper">
        <div><img src="@/assets/about-description.webp"></div>
        <div class="descriptionContent">
            <h3>Our Company</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sollicitudin justo non odio molestie, sed venenatis. Sed purus purus, tincidunt eget malesuada et, molestie ut eros. Fusce blandit, sapien.</p>
        </div>
    </div>
    <div class="testimonialWrapper">
        <h3 style="text-align: center;">Testimonial</h3>
        <Swiper :modules="modules" :slides-per-view="3" :space-between="10" :pagination="{clickable:true}" :navigation="true" class="test-slider">
            <swiper-slide v-for="test in tests" class="test" :key="test.id">
                <h4>{{ test.name }}</h4>
                <img src="@/assets/portrait.webp" style="max-width: 100px;">
                <p>{{ test.content }}</p>
                <h4>{{ test.product }}</h4>
            </swiper-slide>
        </Swiper>
        
    </div>
    <div class="locationWrapper">
        <h3>Where to Find Us</h3>
        <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d620.8883902312278!2d-0.11970080333395822!3d51.503059555644775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2z5Lym5pWm55y8!5e0!3m2!1szh-CN!2sau!4v1749282154391!5m2!1szh-CN!2sau" width="600" height="450" style="border:0;flex: 1;padding-right: 50px;" allowfullscreen="false" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div style="flex: 1;">
                <h4>Tell us how you feel!</h4>
                <form @submit="handleSubmit">
                    <label for="username">姓名：</label>
                    <input type="text" name="username" id="username">
                    <label for="comment">留言：</label>
                    <input type="textarea" name="comment" id="comment">
                    <input type="submit" value="Submit">
                </form>
            </div>
            
        </div>
        
    </div>
    <Footer />
</template>

<script lang="ts" setup>
import MenuBar from '@/components/MenuBar/MenuBar.vue';
import Footer from '@/components/Footer/Footer.vue';
import { onMounted, ref } from 'vue';
import {Swiper,SwiperSlide} from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const imageLoaded = ref(false)

const modules = [Navigation,Pagination]

const tests = [
    {
        id:1,
        name:'Gavin',
        product: 'Banana',
        content:'This is good!'
    },
    {
        id:2,
        name:'Gavin',
        product: 'Banana',
        content:'This is good!'
    },
    {
        id:3,
        name:'Gavin',
        product: 'Banana',
        content:'This is good!'
    },
    {
        id:4,
        name:'Gavin',
        product: 'Banana',
        content:'This is good!'
    }
]

const handleSubmit=()=>{

}

onMounted(() => {
    const img = new Image()
    img.src = new URL('../assets/about-banner.webp', import.meta.url).href
    img.onload = () => {
    // 图片加载完成时回调
        const el = document.querySelector('.aboutBanner')
        el.style.backgroundImage = `url('${img.src}')`
        imageLoaded.value = true
    }
})
</script>

<style scoped>
*{
    margin: 0;
    font-family: 'Poppins', sans-serif;
}

h2{
    font-size: 40px;
}

h3{
    font-size: 32px;
}

h4{
    font-size: 24px;
}

p{
    font-size: 18px;
}

.aboutBanner{
    position: relative;
    height: 400px;
    background-image: url('@/assets/about-banner.webp');
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    margin-bottom: 50px;
}

.aboutBanner.loaded {
    opacity: 1; /* 淡入显示 */
}

.aboutBackground{
    display: flex;
    height: 100%;
    position: relative;
    flex-direction: column;
    justify-content: center;
    padding-left: 200px;
    z-index: 99;
}

.aboutBackground h2,
.aboutBackground p{
    color: white;
}

.bannerOverlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 1;
}

.descriptionWrapper{
    display: flex;
    width: 1200px;
    margin: 0 auto;
}

.descriptionWrapper img{
    max-width: 400px;
}

.descriptionWrapper .descriptionContent{
    display: flex;
    flex-direction: column;
    gap: 25px;
    justify-content: center;
    margin-left: 100px;
}

.test-slider{
    display: flex;
}

.product-slider img{
    width: 50%;
}

.testimonialWrapper{
    margin-top: 40px;
    background-color: #ff8f3c;
    padding: 50px 50px;
}

.testimonialWrapper .testsWrapper{
    display: flex;
}

.testimonialWrapper .test{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.365);
    border-radius: 5px;
}

.locationWrapper{
    width: 1400px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
}

.locationWrapper>div{
    display: flex;
    margin-top: 20px;
}

.locationWrapper form{
    display: flex;
    flex-direction: column;
}

.locationWrapper form label,
.locationWrapper form input{
    font-size: 20px;
    width: 50%;
}

.locationWrapper form input{
    margin-bottom: 30px;
}
</style>