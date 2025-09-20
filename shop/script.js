// Get initial credits from localStorage or default to 0
let credits = parseInt(localStorage.getItem('Credits')) || 0;

// Display elements
const creditsDisplay = document.getElementById('creditsDisplay');
const LE_jumpBoostButton = document.getElementById('LE_jumpBoostButton');
const LE_lowGravityButton = document.getElementById('LE_lowGravityButton');
const FB_noHitButton = document.getElementById('FB_noHitButton');

// Initialize upgrades only if they don't exist
if (localStorage.getItem('LE_lowGravity') === null) {
  localStorage.setItem('LE_lowGravity', '0');
}
if (localStorage.getItem('LE_jumpBoost') === null) {
  localStorage.setItem('LE_jumpBoost', '0');
}
if (localStorage.getItem('FB_noHit') === null) {
  localStorage.setItem('FB_noHit', '0');
}

// Show current credits on the screen
creditsDisplay.innerText = 'Credits: ' + credits;

// Event listener for Jump Boost
LE_jumpBoostButton.addEventListener('click', () => {
  credits = parseInt(localStorage.getItem('Credits')) || 0;

  if (credits < 10) {
    alert('Not enough credits!');
  } else if (localStorage.getItem('LE_jumpBoost') === '1') {
    alert('Jump Boost already purchased!');
  } else {
    alert('Jump Boost purchased!');
    localStorage.setItem('LE_jumpBoost', '1');
    localStorage.setItem('Credits', credits - 10);
    creditsDisplay.innerText = 'Credits: ' + (credits - 10);
  }
});

// Event listener for Low Gravity
LE_lowGravityButton.addEventListener('click', () => {
  credits = parseInt(localStorage.getItem('Credits')) || 0;

  if (credits < 25) {
    alert('Not enough credits!');
  } else if (localStorage.getItem('LE_lowGravity') === '1') {
    alert('Low Gravity already purchased!');
  } else {
    alert('Low Gravity purchased!');
    localStorage.setItem('LE_lowGravity', '1');
    localStorage.setItem('Credits', credits - 25);
    creditsDisplay.innerText = 'Credits: ' + (credits - 25);
  }
});

// Placeholder for No-Hit Mode
FB_noHitButton.addEventListener('click', () => {
  if (credits < 20) {
    alert('Not enough credits!');
  } else if (localStorage.getItem('FB_noHit') === 1) {
    alert('Invincibility already purchased!');
  } else {
    alert('Invincibility purchased!');
    localStorage.setItem('FB_noHit', ((localStorage.getItem('FB_noHit')) + 1));
    localStorage.setItem('Credits', credits - 20);
    creditsDisplay.innerText = 'Credits: ' + (credits - 20);
  }
});
