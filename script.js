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