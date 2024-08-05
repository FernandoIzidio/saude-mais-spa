<script lang="ts">
import {defineComponent} from 'vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
name: "HomeView",
  components: {NavBar},
  mounted() {
    const banners = document.querySelectorAll('#containerBanners img');
    let currentIndex = 0;

    function showNextBanner() {
      banners[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % banners.length;
      banners[currentIndex].classList.add('active');
    }

    setInterval(showNextBanner, 4000);
  }
})
</script>

<template>
  <NavBar></NavBar>
  <div id="containerBanners">
    <img src="../assets/saude-mais.jpg" alt="banner" class="active">
    <img src="../assets/banner-green.jpg" alt="banner">
  </div>
</template>

<style>
  .home-page *{
    vertical-align: baseline;
  }

  .home-page #containerBanners {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: auto;
  }

  .home-page #containerBanners img {
    position: absolute;
    top: 0.1rem;
    width: 100%;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .home-page #containerBanners img.active {
    opacity: 1;
  }

</style>
