const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
let startTime;

// Event listener for input in quoteInputElement
quoteInputElement.addEventListener('input', handleInput);

// Function to handle input in quoteInputElement
function handleInput() {
  const arrayQuote = Array.from(quoteDisplayElement.children);
  const arrayValue = quoteInputElement.value.split('');
  let correct = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove('correct', 'incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.remove('incorrect');
      characterSpan.classList.add('correct');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });

  if (correct) {
    renderNewQuote();
  }
}

// Function to fetch a random quote
async function getRandomQuote() {
  const response = await fetch(RANDOM_QUOTE_API_URL);
  const data = await response.json();
  return data.content;
}

// Function to render a new quote
async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = '';
  startTimer();
}

// Function to start the timer
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
  const elapsedTimeInSeconds = Math.floor((new Date() - startTime) / 1000);
  timerElement.innerText = elapsedTimeInSeconds;
}

// Initial call to render a new quote
renderNewQuote();
