let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
let Credits = 0;

// DOM Elements
const codeEntry = document.getElementById('codeEntry');
const checkButton = document.getElementById('checkButton');
const guessBox = document.getElementById('guessBox');
const resultDisplay = document.getElementById('resultDisplay');
const guessDisplay = document.getElementById('guessDisplay');
const answerButton = document.getElementById('answerButton');

// Initialize code redemption flag if not set
if (localStorage.getItem('codeRedeemed_T') === null) {
  localStorage.setItem('codeRedeemed_T', 'false');
}
let codeRedeemed_T = localStorage.getItem('codeRedeemed_T') === 'true';

// Precomputed SHA-256 hash for the answer (lowercase)
//  1. Start debugging
//  2. Go to the DEBUG CONSOLE
//  3. Type this:
//      hashText(cleanText("StringYouWantToHash"))
//  4. Copy the text here without any trailing spaces
const currentCodeHash = "906a5a6f1852f5446091395cefa0a5a3641cbc8cff01305cc4e4e5db9776d6cc";

// Helper function to hash text using SHA-256
async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Helper function to clean input text
function cleanText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

// Code entry check logic
async function checkCodeEntry() {
  let answer = cleanText(codeEntry.value).replace(/^(a|the)\s+/, "");
  const userCodeInputHash = await hashText(answer);

  if (userCodeInputHash === currentCodeHash) {
    if (codeRedeemed_T) {
        alert("You already redeemed this code!");
      } else {
        alert("A gift for my fellow therians, you now have 50 more credits.");
        localStorage.setItem('Credits', (parseInt(localStorage.getItem('Credits')) || 0) + 50);
        Credits = parseInt(localStorage.getItem('Credits')) || 0;
        codeRedeemed_T = true;
        localStorage.setItem('codeRedeemed_T', 'true');
        alert("You now have " + Credits + " credits.");
      }
    return;
  }

  switch(answer) {
    case "42":
      alert("Hitch-hiker's Guide To The Galaxy?");
      break;
    case "69":
    case "skibidi":
    case "rizz":
    case "gyatt":
    case "gyat":
    case "fortnite":
      alert("No. Do not.");
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
      alert("Really? Huh, ok.");
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
    case "cheese":
      alert("Of course.");
      break;
    case "the cake is a lie":
      alert("We love portal.");
      break;
    case "":
      alert("You didn't even type anything! Try again!");
      break;
    case "therian":
    case "therians":
    case "therianthrope":
    case "therianthropes":
    case "therianthropy":
      alert("Therians geT too mucH hate just foR being our Natural 5elves. I made a c0de just for us.");
      break;
    case "bat":
    case "bats":
      alert("Correct! Check back later for another riddle/joke!");
      break;
    default:
      alert("No, that's not it. Keep trying!");
  }
}

// Number guessing game logic
function checkAnswer() {
  const userAnswer = parseInt(guessBox.value);
  guessCount++;
  guessDisplay.textContent = "Guesses: " + guessCount;

  if (userAnswer === randomNumber) {
    alert("Correct! The number is now different!");
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
  } else if (userAnswer < randomNumber) {
    alert("No, the number is bigger. Try again!");
  } else if (userAnswer > randomNumber) {
    alert("Not quite, the number is smaller than that. Try again!");
  }
}

// Load credits from localStorage
function loadCredits() {
  Credits = parseInt(localStorage.getItem('Credits')) || 0;
}

loadCredits();

// Button & key event bindings
answerButton.addEventListener('click', checkCodeEntry);
checkButton.addEventListener('click', checkAnswer);

codeEntry.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkCodeEntry();
  }
});

guessBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

// Debug logging
document.addEventListener('keypress', (event) => { 
  console.log(`Key "${event.key}" pressed [event: keypress]`);
  console.log("Credits:", localStorage.getItem('Credits'));
  console.log("LE_jumpBoost:", localStorage.getItem('LE_jumpBoost'));
  console.log("LE_lowGravity:", localStorage.getItem('LE_lowGravity'));
});