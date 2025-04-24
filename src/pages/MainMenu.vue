<!-- Intro.vue -->
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import gunnars3 from '@/assets/gunnars3.png'
import start from '@/assets/start.png'
import info from '@/assets/info.png'
import fire from '@/assets/fire.gif'
import '@/styles/style.css'
</script>

<template>
  <div id="intro">
    <img class="main-logo" :src="gunnars3" />

    <div class="buttons">
      <a href="/game" target="_blank" rel="noopener noreferrer">
        <img id="nupp1" :src="start" />
      </a>
      <img id="nupp2" :src="info" />
    </div>

    <div style="flex-grow: 1;"></div> <!-- Tühik surub footer alla -->

    <footer class="footer"></footer>
  </div>
</template>