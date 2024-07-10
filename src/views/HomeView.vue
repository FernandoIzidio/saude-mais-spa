<template>
<NavBar></NavBar>

  <div class="containerBanners">
    <img src="../assets/Saúdemais.jpg" alt="banner" class="active">
    <img src="../assets/bannerVerde.jpg" alt="banner">
  </div>
</template>

<script >
import NavBar from '../components/NavBar.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar
  },
  mounted() {
    const banners = document.querySelectorAll('.containerBanners img');
    let currentIndex = 0;

    function showNextBanner() {
      banners[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % banners.length;
      banners[currentIndex].classList.add('active');
    }

    setInterval(showNextBanner, 4000);
  }
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}


.containerBanners {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: auto;
}

.containerBanners img {
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.containerBanners img.active {
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .nav_header {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav_header ul {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav_header a {
    font-size: 1.5rem;
  }

  .logSignin {
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.5rem;
  }

  .logo {
    font-size: 2.5rem;
  }
}
</style>
