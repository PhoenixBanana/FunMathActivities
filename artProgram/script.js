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
