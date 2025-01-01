let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
const jokeAnswer = document.getElementById('jokeAnswer');
const checkButton = document.getElementById('checkButton');
const guessBox = document.getElementById('guessBox');
const resultDisplay = document.getElementById('resultDisplay');
const guessDisplay = document.getElementById('guessDisplay');

// Precomputed SHA-256 hash for the answer (lowercase)
// You can generate this beforehand using a trusted tool.
// Simplest is to:
//  1. Start debugging
//  2. Go to the DEBUG CONSOLE
//  3. Type this:
//      hashText(cleanText("StringYouWantToHash"))
//  4. Copy the text here without any trailing spaces:
const correctAnswerHash = "730551f5bad4af0604f661e7f8b82e6a6c364ca19ce140166333d86cdc814ca6";

// A helper function to hash a text string using SHA-256 and return the hex digest
async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function cleanText(text) {
  var cleaned = text.toLowerCase();
  cleaned = cleaned.replace(/\s+/g, " ").replace(/^\s+/, "").replace(/\s+$/, "");
  return cleaned;
}

async function checkJokeAnswer() {
  // Get and clean the answer the user provided:
  var answer = cleanText(document.getElementById("jokeAnswer").value);

  // Remove any leading "a " or "the " from the front so you don't get penalized for saying "a bat" instead of "bat":
  answer = answer.replace(/^(a|the)\s+/, "");

  // Hash the answer so we can compare it to our precomputed hash answer:
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
    case "cheese":
      alert("Surya broke my computer.");
      break;
    case "surya":
      alert("Surya Nampali, he broke my computer by mashing all the keys on it. It took me a week just to fix ONE APPLICATION. Surya, if you're reading this: I know where you live.");
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

document.addEventListener('keypress', (event) => { 
  console.log(`Key "${event.key}" pressed [event: keypress]`)});