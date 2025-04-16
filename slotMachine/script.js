var rollBTN = document.getElementById('rollBTN');
var rolledNum1 = 0;
var rolledNum2 = 0;
var rolledNum3 = 0;
var numDisplay1 = document.getElementById('numDisplay1');
var numDisplay2 = document.getElementById('numDisplay2');
var numDisplay3 = document.getElementById('numDisplay3');
const betInput = document.getElementById('betInput');
let credits = parseInt(localStorage.getItem('Credits')) || 0;
let creditsDisplay = document.getElementById('creditsDisplay');
creditsDisplay.innerHTML = ("Credits: " + credits);

async function roll() {
    let bet = parseInt(betInput.value);
    if (isNaN(bet) || bet <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    if (credits < bet) {
        alert('You do not have enough credits for this bet!');
        return;
    }

    console.log(`Betting ${bet} credits... Rolling...`);
    
    rolledNum1 = Math.floor(Math.random() * 10);
    rolledNum2 = Math.floor(Math.random() * 10);
    rolledNum3 = Math.floor(Math.random() * 10);

    console.log(rolledNum1, rolledNum2, rolledNum3);

    credits -= bet;

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

    for (let i = 0; i < 20; i++) {
        // ADD SLOTS AND FIX CHANGING <h2> TO <p>!!!
        numDisplay1.innerHTML = Math.floor(Math.random() * 10);
        numDisplay1.style.color = colors[Math.floor(Math.random() * colors.length)];
        numDisplay2.innerHTML = Math.floor(Math.random() * 10);
        numDisplay2.style.color = colors[Math.floor(Math.random() * colors.length)];
        numDisplay3.innerHTML = Math.floor(Math.random() * 10);
        numDisplay3.style.color = colors[Math.floor(Math.random() * colors.length)];

        await new Promise(resolve => setTimeout(resolve, 50));
    }

    numDisplay1.innerHTML = rolledNum1;
    numDisplay2.innerHTML = rolledNum2;
    numDisplay3.innerHTML = rolledNum3;

    if (
        rolledNum1 === rolledNum2 ||
        rolledNum1 === rolledNum3 ||
        rolledNum2 === rolledNum3
    ) {
        credits += Math.floor(bet); // Win back the bet
        console.log(`Two numbers match - won back ${bet} credits!`);
    } else if (rolledNum1 === rolledNum2 && rolledNum2 === rolledNum3) {
        credits += bet * 2; // Win back double your bet
        console.log(`Triple match - jackpot! Won ${bet * 2} credits!`);
    } else if ( rolledNum1 >= 5 && rolledNum2 >= 5 && rolledNum3 >= 5) {
        credits += bet / 2; // Win back triple your bet
        console.log(`All numbers are greater than 5 - won ${bet / 2} credits!`);
    } else {
        console.log('No win.');
    }

    creditsDisplay.innerHTML = "Credits: " + credits;
    localStorage.setItem('Credits', credits);
}