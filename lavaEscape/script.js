/* script.js */

// Get the canvas element and its 2D drawing context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game states: 'start', 'playing', or 'gameover'
let gameState = 'start';

// Game variables for score tracking
let score = 0;
let highScore = 0;

// Array to hold platform objects
let platforms = [];

// Object to track which keys are pressed
let keys = {};

// Define the player's properties
const player = {
  x: canvas.width / 2 - 20,  
  y: canvas.height - 150,    
  width: 40,
  height: 40,
  velocityX: 0,
  velocityY: 0,
  speed: 5,
  isOnPlatform: false    
};

// Gravity and jump settings
const gravity = 0.5;       
const jumpVelocity = -12;  

// Platform settings
const platformWidth = 100;  
const platformHeight = 15;  
const platformSpeed = 2;    
const platformGap = 120;    
const maxHorizontalGap = 250; // Maximum horizontal distance allowed between platforms

// Safe ground and lava settings
const lavaHeight = 50;                   
const lavaY = canvas.height - lavaHeight; 
const safeTime = 15;  // Duration (in seconds) before ground turns into lava
let gameStartTime = 0; 

/**
 * Clamps a value between a min and max.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Initializes platforms with controlled horizontal spacing.
 */
function initPlatforms() {
  platforms = [];
  let baseX = Math.random() * (canvas.width - platformWidth);
  let y = canvas.height - 100;
  platforms.push({ x: baseX, y: y, width: platformWidth, height: platformHeight });

  while (y > -canvas.height) {
    y -= platformGap;
    let prevX = platforms[platforms.length - 1].x;
    let offset = (Math.random() * 2 - 1) * maxHorizontalGap;
    let newX = clamp(prevX + offset, 0, canvas.width - platformWidth);
    platforms.push({ x: newX, y: y, width: platformWidth, height: platformHeight });
  }
}

/**
 * Initializes or resets the game variables.
 */
function initGame() {
  score = 0;
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - 150;
  player.velocityX = 0;
  player.velocityY = 0;
  player.isOnPlatform = false;
  
  initPlatforms();
  gameStartTime = Date.now();
}

/**
 * Keydown event listener.
 */
document.addEventListener('keydown', function(e) {
  keys[e.key] = true;
  if ((gameState === 'start' || gameState === 'gameover') && e.key === 'Enter') {
    gameState = 'playing';
    initGame();
  }
});

/**
 * Keyup event listener.
 */
document.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});

/**
 * Main game loop.
 */
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

/**
 * Updates game logic.
 */
function update() {
  if (gameState === 'playing') {
    let elapsedTime = (Date.now() - gameStartTime) / 1000;

    if (keys['ArrowLeft']) player.velocityX = -player.speed;
    else if (keys['ArrowRight']) player.velocityX = player.speed;
    else player.velocityX = 0;

    if (keys['ArrowUp'] && player.isOnPlatform) {
      player.velocityY = jumpVelocity;
      player.isOnPlatform = false;
    }

    player.velocityY += gravity;
    player.x += player.velocityX;
    player.y += player.velocityY;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    platforms.forEach(platform => {
      platform.y += platformSpeed;
    });

    platforms = platforms.filter(platform => platform.y < canvas.height);

    while (platforms.length < Math.ceil(canvas.height / platformGap) + 1) {
      let newY = platforms.length > 0 ? platforms[0].y - platformGap : -platformGap;
      let prevX = platforms.length > 0 ? platforms[0].x : Math.random() * (canvas.width - platformWidth);
      let offset = (Math.random() * 2 - 1) * maxHorizontalGap;
      let newX = clamp(prevX + offset, 0, canvas.width - platformWidth);
      platforms.unshift({ x: newX, y: newY, width: platformWidth, height: platformHeight });
    }

    player.isOnPlatform = false;
    platforms.forEach(platform => {
      if (player.velocityY >= 0) {
        if (
          player.x + player.width > platform.x &&
          player.x < platform.x + platform.width &&
          player.y + player.height >= platform.y &&
          player.y + player.height <= platform.y + platform.height
        ) {
          player.y = platform.y - player.height;
          player.velocityY = 0;
          player.isOnPlatform = true;
        }
      }
    });

    if (elapsedTime < safeTime) {
      if (player.y + player.height >= lavaY) {
        player.y = lavaY - player.height;
        player.velocityY = 0;
        player.isOnPlatform = true;
      }
    } else {
      if (player.y + player.height > lavaY) {
        gameState = 'gameover';
        if (score > highScore) {
          highScore = score;
        }
      }
    }

    score += 1;
  }
}

/**
 * Draws the game.
 */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState === 'start') {
    ctx.fillStyle = '#000';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Lava Escape', canvas.width / 2, canvas.height / 2 - 50);
    ctx.font = '24px sans-serif';
    ctx.fillText('Press Enter to Start', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Arrow keys to move', canvas.width / 2, canvas.height / 2 + 50)
  } else if (gameState === 'playing') {
    let elapsedTime = (Date.now() - gameStartTime) / 1000;

    ctx.fillStyle = '#00f';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = '#0a0';
    platforms.forEach(platform => {
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    ctx.fillStyle = elapsedTime < safeTime ? '#0f0' : '#f00';
    ctx.fillRect(0, lavaY, canvas.width, lavaHeight);

    ctx.fillStyle = '#000';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + score, 10, 30);

    if (elapsedTime < safeTime) {
      ctx.fillStyle = '#000';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Lava in: ' + Math.ceil(safeTime - elapsedTime), canvas.width / 2, 30);
    }
  } else if (gameState === 'gameover') {
    ctx.fillStyle = '#000';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);
    ctx.font = '24px sans-serif';
    ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2);
    ctx.fillText('High Score: ' + highScore, canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillText('Press Enter to Restart', canvas.width / 2, canvas.height / 2 + 80);
  }
}

gameLoop();
