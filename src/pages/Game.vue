<template>
  <div class="container">
    <div id="gameinfo-container">
      <router-link to="/" class="back-link">
        ❮ Avalehele
      </router-link>
      <canvas ref="canvas" id="the-game" width="1200" height="1000"></canvas>
    </div>
    <div id="gunnar-container">
      <p id="gunnar-header" v-if="currentText">Gunnar räägib</p>
      <div id="gunnar-text">
        <p v-if="currentText">{{ currentText }}</p>
      </div>

      <p id="copyright">Copyright @ Eliithäkkerid OÜ |  
        <a style="color: red;">EARLY ACCESS</a> | 
        <a style="color: red;">TOP SECRET</a>
      </p>
      <p id="pauseText" v-if="isPausedForText">Vajuta tühikut, et alustada</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import gunnarImgSrc from '@/assets/gunnarhead.png';
import cImgSrc from '@/assets/c.png';
import käedImgSrc from '@/assets/riie.png';
import riieImgSrc from '@/assets/riie3.png';
import jaladImgSrc from '@/assets/jalad.png';
import '@/styles/style2.css';

const canvas = ref(null);
let context;
let snake, food;

const gunnarTexts = [
  ".NET-is teeme me asju, millele isegi raamatupidaja saab klõpsata kartmata, et kõik plahvatab.",
  "Kui sul kulub kolm npm-paketti, et lihtsalt “Hello, world!” öelda, siis tead — sa ei programmeeri, vaid ehitad Duplo maja.",
  "Kui su arendusprotsess eeldab kõigepealt 20 minutit Webpacki käivitamist ja siis npm-i rituaali, siis see pole build – see on okultism.",
  "Kui su rakenduse käivitamiseks on vaja kõigepealt installida 12 “ajutist” dependencyt, siis see pole arendus – see on usuharjutus.",
  "Kui te kuskil näete sõna “Python”, siis teadke, et see pole mitte madu, vaid keegi ehitab jälle Exceli klooni, mis vajab kaheksat RAM-i pulka",
  "Kui su koodi peab igal hommikul parandama, sest “täna ei tööta ühtegi dependency-t”, siis sa ei tee äri – sa oled lootuse katsejänes.",
  "Kui su kood on nii täis buge, et isegi sina ei julge seda pärast kuus kuud avada, siis see pole tarkvara, see on mustkunst.",
  "Pole koodi, pole probleemi — see on targa arendaja filosoofia.",
  ".NET on nagu vana hea nõukaaegne külmkapp – raske, lärmakas, aga töötab ka pärast tuumaplahvatust.",
  "Kui keegi ütleb, et ta arendab 'serverless', siis ma küsin: 'Kas sa ka kodus elektrita elad?'",
  "Async/await C#-is on nagu kohvimasin – sa ei tea täpselt, kuidas ta seesmiselt töötab, aga sa usaldad teda rohkem kui enamik inimesi oma tiimist."
];

let currentText = ref(gunnarTexts[Math.floor(Math.random() * gunnarTexts.length)]);
let isPausedForText = ref(true);

const gunnarImg = new Image();
gunnarImg.src = gunnarImgSrc;
const cImg = new Image();
cImg.src = cImgSrc;
const käedImg = new Image();
käedImg.src = käedImgSrc;
const riieImg = new Image();
riieImg.src = riieImgSrc;
const jaladImg = new Image();
jaladImg.src = jaladImgSrc;

const fps = ref(15);
const score = ref(0);
let gameOver = false;
let gameMessage = null;
let loopTimer = null;

onMounted(() => {
  context = canvas.value.getContext('2d');

  const game = {
    start() {
      gameOver = false;
      score.value = 0;
      fps.value = 15;
      gameMessage = null;
      snake.init();
      food.set();
      isPausedForText.value = true;
      currentText.value = gunnarTexts[Math.floor(Math.random() * gunnarTexts.length)];
      if (loopTimer) clearTimeout(loopTimer);
      loop();
    },

    stop() {
      gameOver = true;
      gameMessage = 'PIDU LÄBI - VAJUTA TÜHIKUT';
      isPausedForText.value = true;
    },

    drawMessage() {
      if (gameMessage !== null) {
        context.fillStyle = '#FF0000';
        context.strokeStyle = '#FFF';
        context.font = `${canvas.value.height / 12}px Pixelify Sans`;
        context.textAlign = 'center';
        context.fillText(gameMessage, canvas.value.width / 2, canvas.value.height / 2);
        context.strokeText(gameMessage, canvas.value.width / 2, canvas.value.height / 2);
      }
    },

    drawScore() {
      context.fillStyle = '#999';
      context.font = `${canvas.value.height}px Impact, sans-serif`;
      context.textAlign = 'center';
      context.fillText(score.value, canvas.value.width / 2, canvas.value.height * 0.9);
    },

    resetCanvas() {
      context.clearRect(0, 0, canvas.value.width, canvas.value.height);
    },

    drawImage(img, x, y, x_size, y_size, rotation = 0) {
      context.save();
      context.translate(x + x_size / 2, y + y_size / 2);
      context.rotate(rotation * Math.PI / 180);
      context.drawImage(img, -x_size / 2, -y_size / 2, x_size, y_size);
      context.restore();
    }
  };

  snake = {
    size: canvas.value.width / 40,
    x: null,
    y: null,
    color: '#4287f5',
    direction: 'left',
    sections: [],
    rotations: [],
    currentRotations: [],

    init() {
      this.sections = [];
      this.rotations = [];
      this.currentRotations = [];
      this.direction = 'left';
      this.x = canvas.value.width / 2 + this.size / 2;
      this.y = canvas.value.height / 2 + this.size / 2;

      for (let i = this.x + (5 * this.size); i >= this.x; i -= this.size) {
        this.sections.push(`${i},${this.y}`);
        this.rotations.push(270);
        this.currentRotations.push(270);
      }
    },

    move() {
      if (isPausedForText.value || gameOver) return;

      switch (this.direction) {
        case 'up': this.y -= this.size; break;
        case 'down': this.y += this.size; break;
        case 'left': this.x -= this.size; break;
        case 'right': this.x += this.size; break;
      }

      let newRotation;
      switch (this.direction) {
        case 'up': newRotation = 0; break;
        case 'right': newRotation = 90; break;
        case 'down': newRotation = 180; break;
        case 'left': newRotation = 270; break;
      }

      this.checkCollision();
      this.checkGrowth();
      this.sections.push(`${this.x},${this.y}`);
      this.rotations.push(newRotation);
      this.currentRotations.push(this.currentRotations[this.currentRotations.length - 1]);
    },

    draw() {
      for (let i = 0; i < this.sections.length; i++) {
        this.drawSection(this.sections[i].split(','), this.sections.length, i);
      }
    },

    drawSection(section, length, index) {
      const [x, y] = section.map(Number);
      const targetRotation = this.rotations[index];
      let currentRotation = this.currentRotations[index];

      const diff = ((targetRotation - currentRotation + 540) % 360) - 180;
      if (Math.abs(diff) > 1) {
        currentRotation += diff;
        currentRotation = (currentRotation + 360) % 360;
      } else {
        currentRotation = targetRotation;
      }

      this.currentRotations[index] = currentRotation;

      const drawParams = [x - 25, y - 25, this.size + 50, this.size + 50, currentRotation];

      if (index === length - 1) game.drawImage(gunnarImg, ...drawParams);
      else if (index === 0) game.drawImage(jaladImg, ...drawParams);
      else if (index === length - 2) game.drawImage(riieImg, ...drawParams);
      else game.drawImage(käedImg, ...drawParams);
    },

    checkCollision() {
      if (this.isCollision(this.x, this.y)) game.stop();
    },

    isCollision(x, y) {
      return (
        x < this.size / 2 || x > canvas.value.width ||
        y < this.size / 2 || y > canvas.value.height ||
        this.sections.includes(`${x},${y}`)
      );
    },

    checkGrowth() {
      if (Math.abs(this.x - food.x) < 50 && Math.abs(this.y - food.y) < 50) {
        score.value++;
        if (score.value % 5 === 0) {
          isPausedForText.value = true;
          currentText.value = gunnarTexts[Math.floor(Math.random() * gunnarTexts.length)];
        }
        if (score.value % 3 === 0 && fps.value < 60) fps.value++;
        food.set();
      } else {
        this.sections.shift();
        this.rotations.shift();
        this.currentRotations.shift();
      }
    }
  };

  food = {
    size: null,
    x: null,
    y: null,
    set() {
      this.size = snake.size;
      this.x = Math.floor(Math.random() * (canvas.value.width - 40)) + 20;
      this.y = Math.floor(Math.random() * (canvas.value.height - 40)) + 20;
    },
    draw() {
      game.drawImage(cImg, this.x, this.y, canvas.value.width / 40, canvas.value.width / 40);
    }
  };

  const keys = {
    up: [38, 75, 87],
    down: [40, 74, 83],
    left: [37, 65, 72],
    right: [39, 68, 76],
    start_game: [13, 32]
  };

  const inverseDirection = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
  };

  const getKey = (value) => {
    for (const key in keys) {
      if (keys[key].includes(value)) return key;
    }
    return null;
  };

  const handleKeydown = (e) => {
    const lastKey = getKey(e.keyCode);
    if (['up', 'down', 'left', 'right'].includes(lastKey) && lastKey !== inverseDirection[snake.direction]) {
      snake.direction = lastKey;
    } else if (lastKey === 'start_game') {
      if (gameOver) {
        game.start();
      } else if (isPausedForText.value) {
        isPausedForText.value = false;
        game.resetCanvas();
      }
    }
  };

  window.addEventListener('keydown', handleKeydown);

  const loop = () => {
    if (!gameOver && !isPausedForText.value) {
      game.resetCanvas();
      game.drawScore();
      snake.move();
      food.draw();
      snake.draw();
      game.drawMessage();
    }
    loopTimer = setTimeout(() => {
      requestAnimationFrame(loop);
    }, 1000 / fps.value);
  };

  game.start();
});
</script>

<style scoped>
canvas {
  background: #eee;
  display: block;
  margin: auto;
}
</style>
