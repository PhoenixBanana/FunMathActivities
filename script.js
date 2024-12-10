let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
const textBox = document.getElementById('textBox');
const checkButton = document.getElementById('checkButton');
const resultDisplay = document.getElementById('resultDisplay');
const guessDisplay = document.getElementById('guessDisplay');

// Precomputed SHA-256 hash for the answer (lowercase)
// You can generate this beforehand using a trusted tool.
//   Result (without trailing spaces):
//   "609cdb3c03dcb1c44d86cb97aadcc4ab4ff9f8fc7a3f1a942bd2f5472db3fd47"
const correctAnswerHash = "29938005928c86bd29bd4f28a8555e35cb7731e0950f6f1f40c6e7dc643732f4";

// A helper function to hash a text string using SHA-256 and return the hex digest
async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function checkJokeAnswer() {
  var answer = document.getElementById("jokeAnswer").value.toLowerCase();
  answer = answer.replace(/\s+/g, " ").replace(/^\s+/, "").replace(/\s+$/, "");
  const userAnswerHash = await hashText(answer);

  if (userAnswerHash === correctAnswerHash)
  {
    alert("That's correct! Check back again soon for a new joke/riddle!");
    return;
  }

  // They didn't get the answer, so we can do some fun easter egg checks here...
  switch(answer)
  {
    case "42":
      alert("Hitch-hiker's Guide To The Galaxy?");
      break;
    case "69":
    case "skibidi":
    case "rizz":
    case "gyatt":
    case "fortnite":
      alert("no. do not.");
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

answerButton.addEventListener('click', checkJokeAnswer);
checkButton.addEventListener('click', checkAnswer);

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
