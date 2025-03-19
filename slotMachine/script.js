var rollBTN = document.getElementById('rollBTN');
var rolledNum1 = 0;
var rolledNum2 = 0;
var rolledNum3 = 0;
var numDisplay1 = document.getElementById('numDisplay1');
var numDisplay2 = document.getElementById('numDisplay2');
var numDisplay3 = document.getElementById('numDisplay3');

function roll() {
    console.log('Rolling...');
    rolledNum1 = Math.floor(Math.random() * 10);
    rolledNum2 = Math.floor(Math.random() * 10);
    rolledNum3 = Math.floor(Math.random() * 10);
    console.log(rolledNum1, rolledNum2, rolledNum3);
    console.log('Rolled!');

    numDisplay1.innerHTML = rolledNum1;
    numDisplay2.innerHTML = rolledNum2;
    numDisplay3.innerHTML = rolledNum3;
    

    if(rolledNum1 === rolledNum2 === rolledNum3) {
        let winDisplay = document.createElement('h3');
        winDisplay.innerHTML = 'Winner!';
        document.body.appendChild(winDisplay);
        console.log('Winner!');
    } else {
        let winDisplay = document.createElement('h3');
        winDisplay.innerHTML = 'You lost!';
        document.body.appendChild(winDisplay);
        console.log('You lost!');
    }
}