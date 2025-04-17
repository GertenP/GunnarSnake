<script setup>
import { ref } from 'vue';
import gunnars3 from '@/assets/gunnars3.png'
import start from '@/assets/start.png'
import info from '@/assets/info.png'
import fire from '@/assets/fire.gif'
import '@/styles/style.css'

</script>

<template>

  <img class="main-logo" :src="gunnars3"></img>


  <div class="buttons">
        <img id="nupp1"  :src="start">
        <img id="nupp2" :src="info">
  </div>

  <footer class="footer">
  </footer>
</template>

