<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

import GunnarSnakeLogo from '@/assets/GunnarSnake.png'
import start from '@/assets/start.png'
import info from '@/assets/info.png'
import fire from '@/assets/fire.gif'
import gunnarbackgroundImage from '@/assets/GunnarBackground.png';



onMounted(() => {
  document.body.style.backgroundColor = 'gray';
  document.body.style.backgroundImage = `url(${gunnarbackgroundImage})`;
  document.body.style.backgroundRepeat = 'repeat';
  document.body.style.backgroundPosition = 'top left'; 
  document.body.style.margin = '0';
  document.body.style.height = '100vh';
  document.body.style.display = 'flex';
  document.body.style.justifyContent = 'center';
  document.body.style.alignItems = 'center';
  document.body.style.flexDirection = 'column';
});



onUnmounted(() => {
  document.body.removeAttribute('style')
})
</script>

<template>
  <div class="page-content">
    <img class="main-logo" :src="GunnarSnakeLogo" />

    <div class="buttons">
      <router-link to="/game">
        <img id="nupp1" :src="start" />
      </router-link>
      <router-link to="/info">
        <img id="nupp2" :src="info" />
      </router-link>
    </div>

    <footer class="footer"></footer>
  </div>
</template>

<style scoped>
.page-content {
  z-index: 2;
}

.main-logo {
  width: 800px;
  max-width: 90%;
  height: auto;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
  animation: float 3s ease-in-out infinite;
}

a {
  position: relative;
  z-index: 11 !important;
}

.buttons {
  margin-top: 20px;
}

.fire {
  width: 100%;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  background-image: url('@/assets/fire.gif');
  background-repeat: repeat-x;
  background-size: 60%;
  background-position: bottom;
  z-index: 10;
}

.footer img {
  width: auto;
  height: 100%;
}
</style>
