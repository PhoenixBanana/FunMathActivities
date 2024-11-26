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
const SPAWN_RATE = 90; // frames
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

// Bird drawing
function drawBird() {
  ctx.fillStyle = '#FF0';
  ctx.fillRect(50, birdY, birdWidth, birdHeight);
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
