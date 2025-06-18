let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
let Credits = 0;

// DOM Elements
const jokeAnswer = document.getElementById('jokeAnswer');
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

// Precomputed SHA-256 hash for the correct answer
const correctAnswerHash = "ca5bcec12f716f44d9745d349cc80422f0d14cbab09329caf533bef7c2d952eb";

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

// Joke answer check logic
async function checkJokeAnswer() {
  let answer = cleanText(jokeAnswer.value).replace(/^(a|the)\s+/, "");
  const userAnswerHash = await hashText(answer);

  if (userAnswerHash === correctAnswerHash) {
    alert("That's correct! Check back again soon for a new joke/riddle!");
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
      alert("You are a therian? Awesome! Here's a little code for my fellow alterhumans: THRN50");
      break;
    case "thrn50":
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
answerButton.addEventListener('click', checkJokeAnswer);
checkButton.addEventListener('click', checkAnswer);

jokeAnswer.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkJokeAnswer();
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