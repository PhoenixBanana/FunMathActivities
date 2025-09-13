const gameCanvas = document.getElementById('gameCanvas');
const noHitDisplay = document.getElementById('noHitDisplay');
const ctx = gameCanvas.getContext('2d');

// Game settings (delta-time aware)
const GRAVITY = 1000; // px/sec^2
const FLAP_STRENGTH = -300; // px/sec
const SPAWN_RATE = 1.5; // seconds between spawns
const OBSTACLE_WIDTH = 50;
const OBSTACLE_GAP = 100;

// Bird settings
let birdY = gameCanvas.height / 2;
let birdVelocity = 0;
let birdFlap = false;
let birdWidth = 20;
let birdHeight = 15;

// Game state
let obstacles = [];
let timeSinceLastSpawn = 0;
let score = 0;
let scoreCredsInt = 0;
let credits = localStorage.getItem('Credits') || 0;
let FloppyBirdHighScore = 0;
let gameOver = false;
let gameStarted = false;
var noHitTimer = 0;

let lastTime = performance.now();

function tick(now) {
  const dt = (now - lastTime) / 1000; // seconds
  lastTime = now;

  update(dt);
  render();

  requestAnimationFrame(tick);
}

// Update game state
function update(dt) {
  if (!gameStarted) return;

  if (gameOver) return;

  updateBird(dt);
  updateObstacles(dt);
  checkCollisions();

  if (scoreCredsInt >= 10) {
    scoreCredsInt = 0;
    credits++;
    localStorage.setItem('Credits', credits);
  }

  if (noHitTimer > 0) {
    noHitTimer = noHitTimer - dt;
  } else if (noHitTimer <= 0) {
    noHitTimer = 0;
    noHitDisplay.innerText = 'Invincibility: inactive';
  }
}

function render() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  if (!gameStarted) {
    ctx.fillStyle = '#FFF';
    ctx.font = '20px Arial';
    ctx.fillText('Click or Space to Start', gameCanvas.width / 2 - 80, gameCanvas.height / 2);
    return;
  }

  drawBird();
  drawObstacles();
  drawScore();
  drawHighScore();

  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, gameCanvas.height / 2 - 30, gameCanvas.width, 100);
    ctx.fillStyle = '#F00';
    ctx.font = '20px Arial';
    ctx.fillText('Game Over', gameCanvas.width / 2 - 80, gameCanvas.height / 2);
    ctx.fillStyle = '#FFF';
    ctx.fillText('Score: ' + score, gameCanvas.width / 2 - 80, gameCanvas.height / 2 + 30);
    ctx.fillText('High Score: ' + FloppyBirdHighScore, gameCanvas.width / 2 - 80, gameCanvas.height / 2 + 60);
    noHitDisplay.innerText = 'Invincibility: inactive';
  }
}

// Bird physics
function updateBird(dt) {
  if (birdFlap) {
    birdVelocity = FLAP_STRENGTH;
    birdFlap = false;
  }
  birdVelocity += GRAVITY * dt;
  birdY += birdVelocity * dt;

  if (birdY < 0) birdY = 0;
  if (birdY + birdHeight > gameCanvas.height) {
    birdY = gameCanvas.height - birdHeight;
    gameOver = true;
  }
}

function drawBird() {
  ctx.save();
  const birdX = 50;
  let rotation = birdVelocity * 0.1;
  rotation = Math.max(Math.min(rotation, 90), -90);

  ctx.translate(birdX + birdWidth / 2, birdY + birdHeight / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.fillStyle = '#DD0';
  ctx.fillRect(-birdWidth / 2, -birdHeight / 2, birdWidth, birdHeight);
  ctx.restore();
}

// Obstacles
function updateObstacles(dt) {

  timeSinceLastSpawn += dt;
  if (timeSinceLastSpawn >= SPAWN_RATE) {
    timeSinceLastSpawn = 0;
    const gapY = Math.random() * (gameCanvas.height - OBSTACLE_GAP);
    obstacles.push({ x: gameCanvas.width, gapY: gapY });
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= 200 * dt;
    if (obstacles[i].x + OBSTACLE_WIDTH < 0) {
      obstacles.splice(i, 1);
      score++;
      scoreCredsInt++;
      if (score > FloppyBirdHighScore) {
        FloppyBirdHighScore = score;
        localStorage.setItem('FloppyBirdHighScore', FloppyBirdHighScore);
      }
    }
  }
}

function drawObstacles() {
  ctx.fillStyle = '#090';
  obstacles.forEach((ob) => {
    ctx.fillRect(ob.x, 0, OBSTACLE_WIDTH, ob.gapY);
    ctx.fillRect(ob.x, ob.gapY + OBSTACLE_GAP, OBSTACLE_WIDTH, gameCanvas.height - ob.gapY - OBSTACLE_GAP);
  });
}

// Collision detection
function checkCollisions() {
  if (noHitTimer > 0) {
    return;
  } else{
  obstacles.forEach((ob) => {
    if (50 + birdWidth > ob.x && 50 < ob.x + OBSTACLE_WIDTH) {
      if (birdY < ob.gapY || birdY + birdHeight > ob.gapY + OBSTACLE_GAP) {
        gameOver = true;
      }
    }
  });
}
}

// Score
function drawScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText('Score: ' + score, 10, 20);
}

function drawHighScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '16px Roboto Mono';
  ctx.fillText('High Score: ' + FloppyBirdHighScore, 150, 20);
}

function resetGame() {
  birdY = gameCanvas.height / 2;
  birdVelocity = 0;
  birdFlap = false;
  obstacles = [];
  timeSinceLastSpawn = 0;
  score = 0;
  gameOver = false;
}

// Event listeners
gameCanvas.addEventListener('click', () => {
  if (!gameStarted) {
    gameStarted = true;
    lastTime = performance.now();
    requestAnimationFrame(tick);
  } else if (gameOver) {
    resetGame();
  } else {
    birdFlap = true;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    if (!gameStarted) {
      gameStarted = true;
      lastTime = performance.now();
      requestAnimationFrame(tick);
    } else if (gameOver) {
      resetGame();
    } else {
      birdFlap = true;
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'c') {
    if (localStorage.getItem('FB_noHit') === '1') {
      noHitTimer = 10; // 10 seconds of invincibility
      localStorage.setItem('FB_noHit', '0');
      if (noHitTimer > 0){
        noHitDisplay.innerText = 'Invincibility: active';
      }
    } else if (localStorage.getItem('FB_noHit') === '0') {
      noHitDisplay.innerText = 'Invincibility: not purchased';
    }
  }
});

function loadHighScore() {
  let stored = localStorage.getItem('FloppyBirdHighScore');
  if (stored) FloppyBirdHighScore = parseInt(stored, 10);
}

loadHighScore();
render(); // Initial screen