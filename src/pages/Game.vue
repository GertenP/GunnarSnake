<template>
    <div class="container">
        <div id="gameinfo-container">
            <router-link to="/" class="back-link">
                ❮ Avalehele
            </router-link>
            <canvas ref="canvas" id="the-game" width="1200" height="1000"></canvas>
        </div>
        <div id="gunnar-container">
            <p id="gunnar-header">Gunnar räägib</p>
            <div id="gunnar-text">
                <p>Noo kuulake nüüd hästi, lapsed —
                    .NET on see uhke Microsofti vidin,
                    millega tehakse päris programme, mitte mingit nalja nagu need JavaScripti pasteedid.
                    Kui tahad kunagi inimestele öelda, et teed päris IT-d, siis .NET on see pilet
                    — kõik muu on lihtsalt klõps-klõps ja "eliithäkkerite" mängumaa.
                </p>
            </div>
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
let game, snake, food;

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

onMounted(() => {
    context = canvas.value.getContext('2d');

    game = {
        score: 0,
        fps: 2,
        over: false,
        message: null,

        start() {
            this.over = false;
            this.message = null;
            this.score = 0;
            this.fps = 15;
            snake.init();
            food.set();
            loop();
        },

        stop() {
            this.over = true;
            this.message = 'GAME OVER - PRESS SPACEBAR';
        },

        drawBox(x, y, size, color) {
            context.fillStyle = color;
            context.beginPath();
            context.rect(x - size / 2, y - size / 2, size, size);
            context.fill();
        },

        drawScore() {
            context.fillStyle = '#999';
            context.font = `${canvas.value.height}px Impact, sans-serif`;
            context.textAlign = 'center';
            context.fillText(this.score, canvas.value.width / 2, canvas.value.height * 0.9);
        },

        drawMessage() {
            if (this.message !== null) {
                context.fillStyle = '#00F';
                context.strokeStyle = '#FFF';
                context.font = `${canvas.value.height / 10}px Impact`;
                context.textAlign = 'center';
                context.fillText(this.message, canvas.value.width / 2, canvas.value.height / 2);
                context.strokeText(this.message, canvas.value.width / 2, canvas.value.height / 2);
            }
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
                this.rotations.push(270); // left
                this.currentRotations.push(270);
            }
        },

        move() {
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
                game.score++;
                game.fps += 1;
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
            this.x = Math.floor(Math.random() * 1190) + 10
            this.y = Math.floor(Math.random() * 990) + 10
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
        } else if (lastKey === 'start_game' && game.over) {
            game.start();
            window.location.reload();
        }
    };

    window.addEventListener('keydown', handleKeydown);

    const loop = () => {
        if (!game.over) {
            game.resetCanvas();
            game.drawScore();
            snake.move();
            food.draw();
            snake.draw();
            game.drawMessage();
        }
        setTimeout(() => {
            requestAnimationFrame(loop);
        }, 1000 / game.fps);
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