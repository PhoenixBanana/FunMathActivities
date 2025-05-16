var credits = parseInt(localStorage.getItem('Credits')) || 0;
var creditsDisplay = document.getElementById('creditsDisplay');
creditsDisplay.innerText = 'Credits: ' + credits;
var LE_jumpBoostButton = document.getElementById('LE_jumpBoostButton');
var LE_lowGravityButton = document.getElementById('LE_lowGravityButton');
var FB_noHitButton = document.getElementById('FB_noHitButton');
let LE_lowGravity = localStorage.setItem('LE_lowGravity', 0);
let LE_jumpBoost = localStorage.setItem('LE_jumpBoost', 0);
let FB_invincibility = localStorage.setItem('FB_noHit', 0);

LE_jumpBoostButton.addEventListener('click', () => {
    localStorage.setItem('LE_jumpBoost', 1);
    localStorage.setItem('Credits', credits - 10);
    credits = parseInt(localStorage.getItem('Credits')) || 0;
    creditsDisplay.innerText = 'Credits: ' + credits;
    console.log('Jump Boost purchased');
    console.log(localStorage.getItem('LE_jumpBoost'));
    console.log(localStorage.getItem('Credits'));
  });
LE_lowGravityButton.addEventListener('click', () => {
    localStorage.setItem('LE_lowGravity', 1);
    localStorage.setItem('Credits', credits - 25);
    credits = parseInt(localStorage.getItem('Credits')) || 0;
    creditsDisplay.innerText = 'Credits: ' + credits;
    console.log('Low Gravity purchased');
    console.log(localStorage.getItem('LE_lowGravity'));
    console.log(localStorage.getItem('Credits'));
})