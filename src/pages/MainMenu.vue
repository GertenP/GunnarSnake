<script setup>
import { ref } from 'vue';
import gunnars3 from '@/assets/gunnars3.png'
import start from '@/assets/start.png'
import info from '@/assets/info.png'

</script>

<template>
  <div class="header">
    <img class="main-logo" :src="gunnars3" />
  </div>

  <div class="buttons">
      <button class="start-button">
        <img  :src="start">
        <img  :src="info">
      </button>
  </div>
</template>

