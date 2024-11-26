let randomNumber = Math.floor(Math.random() * 100) + 1;
    const textBox = document.getElementById('textBox');
    const checkButton = document.getElementById('checkButton');
    const resultDisplay = document.getElementById('resultDisplay');
    const clickButton = document.getElementById('clickButton');
    let clickerScore = 0;
    const scoreDisplay = document.getElementById('scoreDisplay');
    let pointsPerClick = 1; 
    let clickCount = 0;
    let pointsIncrement = 1;
    let guessCount = 0;
    const guessDisplay = document.getElementById('guessDisplay');

    function checkJokeAnswer() {
      var answer = document.getElementById("jokeAnswer").value.toLowerCase();
      answer = answer.replace(/\s+/g, " ").replace(/^\s+/, "").replace(/\s+$/, "");
      switch(answer)
      {
        case "Hampire":
        case "A Hampire":
          alert("That's correct! Check back again soon for a new joke/riddle!");
          break;
        case "What is a hampire":
        case "What is a hampire?":
        case "Who is a hampire":
        case "Who is a hampire?":
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

    function incrementScore() {
      clickerScore += pointsPerClick;
      scoreDisplay.textContent = "Score: " + clickerScore;
      clickCount++;

      if (clickCount === 10) {
        pointsPerClick += pointsIncrement;
        pointsIncrement++;
        clickCount = 0;
      }
    }

    function RQFBRedirection() { 
      window.open('https://phoenixbanana.github.io/FloppyBird/'); 
    }

    answerButton.addEventListener('click', checkJokeAnswer);
    checkButton.addEventListener('click', checkAnswer);
    clickButton.addEventListener('click', incrementScore);
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

function drawBird() {
  ctx.save();
  const birdX = 50; // Fixed x position for the bird
  let rotation;

  if (birdVelocity < 0) {
    
    rotation = Math.max(birdVelocity / 5, -5); // Adjust divisor and limit for upward
  } else {
    
    rotation = Math.min(birdVelocity / 10, 50); // Adjust divisor and limit for downward
  }

  ctx.translate(birdX + birdWidth / 2, birdY + birdHeight / 2);
  ctx.rotate(rotation);
  ctx.fillStyle = '#FF0';
  ctx.fillRect(-birdWidth / 2, -birdHeight / 2, birdWidth, birdHeight);

  ctx.restore();
}


// Handle bird physics
function updateBird() {
  if (birdFlap) {
    birdVelocity = FLAP_STRENGTH;
    birdFlap = false;
  }
  birdVelocity += GRAVITY;
  birdY += birdVelocity;

  if (birdY < 0) birdY = 0;
  if (birdY + birdHeight > gameCanvas.height) {
    birdY = gameCanvas.height - birdHeight;
    gameOver = true;
  }
}

// Generate obstacles
function generateObstacles() {
  if (frame % SPAWN_RATE === 0 && !gameOver) {
    let gapY = Math.random() * (gameCanvas.height - 200);
    obstacles.push({ x: gameCanvas.width, gapY: gapY });
  }
  obstacles.forEach((obstacle, index) => {
    obstacle.x -= 3;
    if (obstacle.x + OBSTACLE_WIDTH < 0) obstacles.splice(index, 1);
  });
}

// Draw obstacles
function drawObstacles() {
  ctx.fillStyle = '#228B22';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, 0, OBSTACLE_WIDTH, obstacle.gapY);
    ctx.fillRect(obstacle.x, obstacle.gapY + 100, OBSTACLE_WIDTH, gameCanvas.height - obstacle.gapY - 100);
  });
}

// Check collisions
function checkCollisions() {
  obstacles.forEach(obstacle => {
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
  ctx.fillText('Pipes Passed: ' + score, 10, 20);
}

// Update game state
function update() {
  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, gameCanvas.height / 2 - 30, gameCanvas.width, 60);
    ctx.fillStyle = '#FFF';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', gameCanvas.width / 2 - 80, gameCanvas.height / 2);
    return;
  }

  frame++;
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  updateBird();
  generateObstacles();
  drawBird();
  drawObstacles();
  drawScore();
  checkCollisions();

  if (frame % 100 === 0 && !gameOver) score++;
  requestAnimationFrame(update);
}

// Reset game
function resetGame() {
  birdY = gameCanvas.height / 2;
  birdVelocity = 0;
  birdFlap = false;
  obstacles = [];
  frame = 0;
  score = -1;
  gameOver = false;
  update();
}

// Event listener for bird flap and game reset
gameCanvas.addEventListener('click', () => {
    if (gameOver) {
            resetGame();
    } else {
      birdFlap = true;
    }
});

// Start the game
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
    console.log(key);

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
