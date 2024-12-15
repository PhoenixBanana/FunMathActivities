  const gameCanvas = document.getElementById('gameCanvas');
  const ctx = gameCanvas.getContext('2d');
  
  // Game settings
  const GRAVITY = 0.125;
  const FLAP_STRENGTH = -2.5;
  const SPAWN_RATE = 500; // frames
  const OBSTACLE_WIDTH = 50;
  const OBSTACLE_SPACING = 200;
  
  // Game state variables
  let birdY = gameCanvas.height / 2;
  let birdVelocity = 0;
  let birdFlap = false;
  let birdWidth = 20;
  let birdHeight = 15;
  
  let obstacles = [];
  let frame = 0;
  let score = 0;
  let gameOver = false;
  let gameStarted = false; // Ensures game starts only after the first click
  
  function drawBird() {
    ctx.save();
    const birdX = 50; // Fixed x position for the bird
  
    // Calculate rotation angle based on velocity
    let rotation = birdVelocity * 2; // Base rotation proportional to velocity
    rotation = Math.max(rotation, -90); // Clamp rotation to a minimum of -90° (upward limit)
    rotation = Math.min(rotation, 90);  // Clamp rotation to a maximum of 90° (downward limit)
  
    // Translate and rotate the canvas to simulate bird rotation
    ctx.translate(birdX + birdWidth / 2, birdY + birdHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180); // Convert degrees to radians
  
    // Draw the bird (centered on the rotated position)
    ctx.fillStyle = '#990000';
    ctx.fillRect(-birdWidth / 2, -birdHeight / 2, birdWidth, birdHeight);
  
    ctx.restore();
  }
  
  
  // Update bird physics
  function updateBird() {
    if (birdFlap) {
      birdVelocity = FLAP_STRENGTH;
      birdFlap = false;
    }
    birdVelocity += GRAVITY;
    birdY += birdVelocity;
  
    if (birdY < 0) birdY = 0; // Prevent bird from going off the top
    if (birdY + birdHeight > gameCanvas.height) {
      birdY = gameCanvas.height - birdHeight;
      gameOver = true;
    }
  }
  
  // Generate obstacles
  function generateObstacles() {
    if (frame % SPAWN_RATE === 0 && !gameOver) {
      let gapY = Math.random() * (gameCanvas.height - OBSTACLE_SPACING);
      obstacles.push({ x: gameCanvas.width, gapY: gapY });
    }
    obstacles.forEach((obstacle, index) => {
      obstacle.x -= 0.75; // Move obstacle left
      if (obstacle.x + OBSTACLE_WIDTH < 0) {
        obstacles.splice(index, 1); // Remove off-screen obstacles
        score++; // Increment score for passing an obstacle
      }
    });
  }
  
  // Draw obstacles
  function drawObstacles() {
    ctx.fillStyle = '#AFEEEE';
    obstacles.forEach((obstacle) => {
      ctx.fillRect(obstacle.x, 0, OBSTACLE_WIDTH, obstacle.gapY); // Top pipe
      ctx.fillRect(
        obstacle.x,
        obstacle.gapY + 100,
        OBSTACLE_WIDTH,
        gameCanvas.height - obstacle.gapY - 100
      ); // Bottom pipe
    });
  }
  
  // Check collisions
  function checkCollisions() {
    obstacles.forEach((obstacle) => {
      if (50 + birdWidth > obstacle.x && 50 < obstacle.x + OBSTACLE_WIDTH) {
        if (birdY < obstacle.gapY || birdY + birdHeight > obstacle.gapY + 100) {
          gameOver = true;
        }
      }
    });
  }
  
  // Draw score
  function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
  }
  
  // Reset game
  function resetGame() {
    birdY = gameCanvas.height / 2;
    birdVelocity = 0;
    birdFlap = false;
    obstacles = [];
    frame = 0;
    score = 0;
    gameOver = false;
    gameStarted = false;
    update();
  }
  
  // Update game state
  function update() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  
    if (!gameStarted) {
      // Display "Click to Start" message
      ctx.fillStyle = '#FFF';
      ctx.font = '20px Arial';
      ctx.fillText('Click to Start', gameCanvas.width / 2 - 60, gameCanvas.height / 2);
      return;
    }
  
    if (gameOver) {
      // Display "Game Over" message
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, gameCanvas.height / 2 - 30, gameCanvas.width, 60);
      ctx.fillStyle = '#FFF';
      ctx.font = '30px Arial';
      ctx.fillText('Game Over', gameCanvas.width / 2 - 80, gameCanvas.height / 2);
      return;
    }
  
    frame++;
    updateBird();
    generateObstacles();
    drawBird();
    drawObstacles();
    drawScore();
    checkCollisions();
  
    requestAnimationFrame(update);
  }
  
  // Event listener for bird flap and game start
  gameCanvas.addEventListener('click', () => {
    if (!gameStarted) {
      gameStarted = true;
      update();
    } else if (gameOver) {
      resetGame();
    } else {
      birdFlap = true;
    }
  });
  
  // Initial call to draw the start screen
  update();