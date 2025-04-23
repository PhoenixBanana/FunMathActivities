var credits = parseInt(localStorage.getItem('Credits')) || 0;
var creditsDisplay = document.getElementById('creditsDisplay');
creditsDisplay.innerText = 'Credits: ' + credits;
var LE_jumpBoostButton = document.getElementById('LE_jumpBoostButton');
var LE_lowGravityButton = document.getElementById('LE_lowGravityButton');
let LE_jumpBoost = 0;
let LE_lowGravity = 0;

LE_jumpBoostButton.addEventListener('click', () => {
    LE_jumpBoost = 1;
    credits -= 10;
  });
LE_lowGravityButton.addEventListener('click', () => {
    LE_lowGravity = 1;
    credits -= 50;
  }