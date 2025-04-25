<script setup>
import { onMounted } from 'vue';


onMounted(() => {
  document.body.style.backgroundColor = 'gray';
});


</script>

<template>
    <div class="button">
      <router-link to="/">
        <button>< Avalehele</button>
      </router-link>
    </div>
    <header>
      <p>INFO</p>
      <img src="../assets/GameOfTheYear.png" alt="">
    </header>




</template>

<style scoped>
button{
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
}
</style>


<style>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
</style>

