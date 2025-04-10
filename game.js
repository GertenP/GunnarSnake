var canvas = document.getElementById("the-game");
var context = canvas.getContext("2d");
var game, snake, food;
var gunnarImg = new Image();
gunnarImg.src = 'gunnar.png';
var cImg = new Image();
cImg.src = 'c.png';
var käedImg = new Image();
käedImg.src = 'riie.png'
var riieImg = new Image();
riieImg.src = 'riie3.png'
var jaladImg = new Image();
jaladImg.src = 'jalad.png'
game = {
  
  score: 0,
  fps: 2,
  over: false,
  message: null,
  
  start: function() {
    game.over = false;
    game.message = null;
    game.score = 0;
    game.fps = 15;
    snake.init();
    food.set();
  },
  
  stop: function() {
    game.over = true;
    game.message = 'GAME OVER - PRESS SPACEBAR';
  },
  
  drawBox: function(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x - (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y + (size / 2));
    context.lineTo(x - (size / 2), y + (size / 2));
    context.closePath();
    context.fill();
  },
  
  drawScore: function() {
    context.fillStyle = '#999';
    context.font = (canvas.height) + 'px Impact, sans-serif';
    context.textAlign = 'center';
    context.fillText(game.score, canvas.width / 2, canvas.height * 0.9);
  },
  
  drawMessage: function() {
    if (game.message !== null) {
      context.fillStyle = '#00F';
      context.strokeStyle = '#FFF';
      context.font = (canvas.height / 10) + 'px Impact';
      context.textAlign = 'center';
      context.fillText(game.message, canvas.width / 2, canvas.height / 2);
      context.strokeText(game.message, canvas.width / 2, canvas.height / 2);
    }
  },
  
  resetCanvas: function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  },

  drawImage: function(img, x, y, x_size, y_size, rotation = 0) {
    context.save();
    context.translate(x + x_size / 2, y + y_size / 2); // Liigume pildi keskpunkti
    context.rotate(rotation * Math.PI / 180); // Pööra kraadides
    context.drawImage(img, -x_size / 2, -y_size / 2, x_size, y_size);
    context.restore();
  }
  
  
};

snake = {
  
  size: canvas.width / 40,
  x: null,
  y: null,
  color: '#4287f5',
  direction: 'left',
  sections: [],
  
  init: function() {
    snake.sections = [];
    snake.direction = 'left';
    snake.x = canvas.width / 2 + snake.size / 2;
    snake.y = canvas.height / 2 + snake.size / 2;
    for (var i = snake.x + (5 * snake.size); i >= snake.x; i -= snake.size) {
      snake.sections.push(i + ',' + snake.y); 
    }
  },
  
  move: function() {
    switch (snake.direction) {
      case 'up':
        snake.y -= snake.size;
        break;
      case 'down':
        snake.y += snake.size;
        break;
      case 'left':
        snake.x -= snake.size;
        break;
      case 'right':
        snake.x += snake.size;
        break;
    }
    snake.checkCollision();
    snake.checkGrowth();
    snake.sections.push(snake.x + ',' + snake.y);
  },
  
  draw: function() {
    for (var i = 0; i < snake.sections.length; i++) {
      snake.drawSection(snake.sections[i].split(','), snake.sections.length, i);
    }    
  },
  
  drawSection: function(section, pikkus, index) {
    console.log(section);
    if (index == pikkus - 1) {
      let rotation = 0;
      switch(snake.direction) {
        case 'left': rotation = -90; break;
        case 'right': rotation = 90; break;
        case 'down': rotation = 180; break;
        case 'up': rotation = 0; break;
      }
      game.drawImage(gunnarImg, parseInt(section[0]) - 25, parseInt(section[1]) - 25, canvas.width / 40 + 50, canvas.width / 40 + 50, rotation);
    }
    else if (index == 0){
      let rotation = 0;
      switch(snake.direction) {
        case 'left': rotation = -90; break;
        case 'right': rotation = 90; break;
        case 'down': rotation = 180; break;
        case 'up': rotation = 0; break;
      }
      game.drawImage(jaladImg, parseInt(section[0]) - 25, parseInt(section[1]) - 25, canvas.width / 40 + 50, canvas.width / 40 + 50, rotation);
    }

    else if (index == pikkus - 2) {
      let rotation = 0;
      switch(snake.direction) {
        case 'left': rotation = -90; break;
        case 'right': rotation = 90; break;
        case 'down': rotation = 180; break;
        case 'up': rotation = 0; break;
      }
      game.drawImage(riieImg, parseInt(section[0]) - 25, parseInt(section[1]) - 25, canvas.width / 40 + 50, canvas.width / 40 + 50, rotation);
    }
    else {
      let rotation = 0;
      switch(snake.direction) {
        case 'left': rotation = -90; break;
        case 'right': rotation = 90; break;
        case 'down': rotation = 180; break;
        case 'up': rotation = 0; break;
      }
      game.drawImage(käedImg, parseInt(section[0]) - 25, parseInt(section[1]) - 25, canvas.width / 40 + 50, canvas.width / 40 + 50, rotation);
    }
  },
  
  checkCollision: function() {
    if (snake.isCollision(snake.x, snake.y) === true) {
      game.stop();
    }
  },
  
  isCollision: function(x, y) {
    if (x < snake.size / 2 ||
        x > canvas.width ||
        y < snake.size / 2 ||
        y > canvas.height ||
        snake.sections.indexOf(x + ',' + y) >= 0) {
      return true;
    }
  },
  
  checkGrowth: function() {
    if (snake.x == food.x && snake.y == food.y) {
      game.score++;
      if (game.score % 5 == 0 && game.fps < 60) {
        game.fps++;
      }
      food.set();
    } else {
      snake.sections.shift();
    }
  }
  
};

food = {
  
  size: null,
  x: null,
  y: null,
  color: '#0FF',
  
  set: function() {
    food.size = snake.size;
    food.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size / 2;
    food.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size / 2;
  },
  
  draw: function() {
    game.drawImage(cImg ,food.x, food.y, canvas.width / 40, canvas.width / 40);
  }
  
};

var inverseDirection = {
  'up': 'down',
  'left': 'right',
  'right': 'left',
  'down': 'up'
};

var keys = {
  up: [38, 75, 87],
  down: [40, 74, 83],
  left: [37, 65, 72],
  right: [39, 68, 76],
  start_game: [13, 32]
};

function getKey(value){
  for (var key in keys){
    if (keys[key] instanceof Array && keys[key].indexOf(value) >= 0){
      return key;
    }
  }
  return null;
}

addEventListener("keydown", function (e) {
    var lastKey = getKey(e.keyCode);
    if (['up', 'down', 'left', 'right'].indexOf(lastKey) >= 0
        && lastKey != inverseDirection[snake.direction]) {
      snake.direction = lastKey;
    } else if (['start_game'].indexOf(lastKey) >= 0 && game.over) {
      game.start();
    }
}, false);

var requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;

function loop() {
  if (game.over == false) {
    game.resetCanvas();
    game.drawScore();
    snake.move();
    food.draw();
    snake.draw();
    game.drawMessage();

  }
  setTimeout(function() {
    requestAnimationFrame(loop);
  }, 1000 / game.fps);
}

// var canvas = document.getElementById("the-game");
// var context = canvas.getContext("2d");

// var gunnarImg = new Image();
// gunnarImg.src = 'gunnar.png'; // Pane gunnar.png sama kausta kus HTML fail

// gunnarImg.onload = function() {
//   context.drawImage(gunnarImg, 100, 100, 100, 100); // x, y, laius, kõrgus
// };

requestAnimationFrame(loop);