let randomNumber = Math.floor(Math.random() * 100) + 1;
    const textBox = document.getElementById('textBox');
    const checkButton = document.getElementById('checkButton');
    const resultDisplay = document.getElementById('resultDisplay');
    const guessDisplay = document.getElementById('guessDisplay');
    let points = 0;
  let cps = 0;
  let cpc = 1;
  let pointsDisplay = document.getElementById("pointsDisplay");
  let cpsDisplay = document.getElementById("cpsDisplay");
  let cpcDisplay = document.getElementById("cpcDisplay");
  let cpsCost = 10;
  let cpcCost = 5;
  let cpsCostDisplay = document.getElementById("cpsCostDisplay");
  let cpcCostDisplay = document.getElementById("cpcCostDisplay");
  const cpsButton = document.getElementById("cpsButton");
  const clickButton = document.getElementById("clickButton");
  const cpcButton = document.getElementById("cpcButton");

  cpsButton.addEventListener('click', () => {
  if (points >= cpsCost) {
    cps++;
    points = points - cpsCost;
    cpsCost = cpsCost + 2;
    cpsDisplay.innerHTML = "CPS: " + cps;
    cpsCostDisplay.innerHTML = "CPS Costs: " + cpsCost;
  } else {
    console.log("Not enough points. CPS maintained.")
  }
});

cpcButton.addEventListener('click', () => {
  if (points >= cpcCost) {
    cpc++;
    points = points - cpcCost;
    cpcCost = cpcCost + 1;
    cpcDisplay.innerHTML = "CPC: " + cpc;
    cpcCostDisplay.innerHTML = "CPC Costs: " + cpcCost;
  } else {
    console.log("Not enough points. CPC maintained.")
  }
})

clickButton.addEventListener('click', () => {
  points = points + cpc;
  pointsDisplay.innerHTML = "Points: " + points;
});

setInterval(() => {
  points += cps;
  pointsDisplay.innerHTML = "Points: " + points;
}, 1000);

    function checkJokeAnswer() {
      var answer = document.getElementById("jokeAnswer").value.toLowerCase();
      answer = answer.replace(/\s+/g, " ").replace(/^\s+/, "").replace(/\s+$/, "");
      switch(answer)
      {
        case "hampire":
        case "a hampire":
          alert("That's correct! Check back again soon for a new joke/riddle!");
          break;
        case "what is a hampire":
        case "what is a hampire?":
        case "who is a hampire":
        case "who is a hampire?":
          alert("This isn't Jeopardy, but I'll allow it. Correct!");
          break;
        case "42":
          alert("Hitch-hiker's Guide To The Galaxy?");
          break;
        case "69":
        case "skibidi":
        case "rizz":
        case "gyatt":
        case "fortnite":
          alert("Stay away from me and my family.");
          break;
        case "bill cipher":
        case "cipher":
        case "bill":
          alert("Bad deal. No dice.");
          break;
        case "1985":
          alert("Do you also want to rule the world?");
          break;
        case "1987":
          alert("You gave me up, you let me down, you ran around and deserted me. You made me cry, you said 'Goodbye', you told a lie and hurt me.");
          break;
        case "37":
          alert("Really?");
          break;
        case "fuck":
        case "shit":
        case "bitch":
        case "ass":
        case "dick":
        case "bastard":
          alert("That is highly inappropriate. Please think twice or even thrice before saying such terrible things, you wouldn't talk to your kind, loving mother that way, so don't talk that way to others, or yourself.");
          break;
        case "five nights at freddy's":
        case "fnaf":
          alert("Fazbear Ent. established 1983");
          break;
        case "2014":
          alert("Five Nights at Freddy's");
          break;
        case "1983":
          alert("Wasn't there some game about a certain franchise established this year?");
          break;
        default:
          alert("No, that's not it. Keep trying!");
      }
    }
    function checkAnswer() {
      const userAnswer = parseInt(guessBox.value);
      guessCount++;
      guessDisplay.textContent = "Guesses: " + guessCount;
      if (userAnswer === randomNumber) {
        alert("Correct! The number is now different!");
        randomNumber = Math.floor(Math.random() * 100) + 1;
        guessCount = 0;
      } else if(userAnswer <  randomNumber) {
        alert("No, the number is bigger. Try again!");
      } else if(userAnswer > randomNumber) {
        alert("Not quite, the number is smaller than that. Try again!");
      }
    }

    function RQFBRedirection() { 
      window.open('https://phoenixbanana.github.io/FloppyBird/'); 
    }

    answerButton.addEventListener('click', checkJokeAnswer);
    checkButton.addEventListener('click', checkAnswer);
    FloppyBirdRedirect.addEventListener('click', RQFBRedirection);

    const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');

// Game settings
const GRAVITY = 0.25;
const FLAP_STRENGTH = -5;
const SPAWN_RATE = 100; // frames
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
    obstacle.x -= 3; // Move obstacle left
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



const artCanvas = document.getElementById('artCanvas');
const ctx2 = artCanvas.getContext('2d');
const gridSize = 10;
let currentColor = 'black';
let isDragging = false;
let isFloodFill = false;

// Initialize canvas with white background
function initializeCanvas() {
  ctx2.fillStyle = 'white';
  ctx2.fillRect(0, 0, artCanvas.width, artCanvas.height);

  /* //Draw grid
  ctx2.strokeStyle = 'black';
  for (let x = 0; x <= artCanvas.width; x += gridSize) {
    for (let y = 0; y <= artCanvas.height; y += gridSize) {
      ctx2.strokeRect(x, y, gridSize, gridSize); 
    }
   } */
  } 

  initializeCanvas();

// Handle color change
document.querySelectorAll('.color').forEach((colorDiv) => {
  colorDiv.addEventListener('click', () => {
    currentColor = colorDiv.dataset.color;
  });
});

// Switch to paint bucket
document.getElementById('paintBucket').addEventListener('click', () => {
  isFloodFill = true;
  console.log(`Paint bucket selected`);
});

document.getElementById('pencil').addEventListener('click', () => {
  isFloodFill = false;
  console.log(`Pencil selected`);
});

// Start painting or flood fill
artCanvas.addEventListener('mousedown', (e) => {
  if (isFloodFill) {
    floodFill(e);
  } else {
    isDragging = true;
    paint(e);
  }
});

// Stop dragging
artCanvas.addEventListener('mouseup', () => {
  isDragging = false;
});

// Paint while dragging
artCanvas.addEventListener('mousemove', (e) => {
  if (isDragging) paint(e);
});

// Paint a square
function paint(e) {
  const rect = artCanvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / gridSize) * gridSize;
  const y = Math.floor((e.clientY - rect.top) / gridSize) * gridSize;

  ctx2.fillStyle = currentColor;
  ctx2.fillRect(x, y, gridSize, gridSize);
}

// Get color of a pixel
function getColorAtPixel(x, y) {
  const imageData = ctx2.getImageData(x, y, 1, 1).data;
  return `rgba(${imageData[0]},${imageData[1]},${imageData[2]},${imageData[3]})`; // Alpha left unscaled (0-255)
}

// Improved color matching
function colorsMatch(color1, color2) {
  const c1 = color1.match(/\d+/g); // Extract RGBA numbers
  const c2 = color2.match(/\d+/g);

  if (!c1 || !c2) return false; // Prevent errors with malformed strings
  return c1.every((value, index) => parseInt(value, 10) === parseInt(c2[index], 10));
}

// Flood fill function
function floodFill(e) {
  const rect = artCanvas.getBoundingClientRect();
  const startX = Math.floor((e.clientX - rect.left) / gridSize) * gridSize;
  const startY = Math.floor((e.clientY - rect.top) / gridSize) * gridSize;

  const targetColor = getColorAtPixel(startX, startY);
  console.log(`Flood fill start at (${startX}, ${startY}) with target color: ${targetColor}`);

  // Prevent unnecessary fill if the target color matches the current color
  if (colorsMatch(targetColor, `rgba(${currentColor},255)`)) {
    console.log("Target color matches current color. No action taken.");
    return;
  }

  const pixelStack = [[startX, startY]];
  const visited = new Set();

  while (pixelStack.length > 0) {
    const [currentX, currentY] = pixelStack.pop();
    const key = `${currentX},${currentY}`;
    if (visited.has(key)) continue;
    visited.add(key);
    //console.log(key);

    if (!colorsMatch(getColorAtPixel(currentX, currentY), targetColor)) continue;

    ctx2.fillStyle = currentColor;
    ctx2.fillRect(currentX, currentY, gridSize, gridSize);

    // Push neighbors if within bounds
    if (currentX + gridSize < artCanvas.width) pixelStack.push([currentX + gridSize, currentY]);
    if (currentX - gridSize >= 0) pixelStack.push([currentX - gridSize, currentY]);
    if (currentY + gridSize < artCanvas.height) pixelStack.push([currentX, currentY + gridSize]);
    if (currentY - gridSize >= 0) pixelStack.push([currentX, currentY - gridSize]);
  }

  console.log('Flood fill starting...');
  console.log('Current Color:', currentColor);
}
