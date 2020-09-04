//global variables to get html elements
const wordEl = document.querySelector("#word");
const wrongLetterEl = document.querySelector("#wrong-letters");
const playAgainBtn = document.querySelector("#play-again-btn");
const popupEl = document.querySelector("#popup-container");
const notificationEl = document.querySelector("#notification-container");
const finalMessageEl = document.querySelector("#final-message");
const figurePartEl = document.querySelectorAll(".figure-part");
const winEl = document.querySelector("#win");
const loseEl = document.querySelector("#lose");

const words = [
  "application",
  "batman",
  "wizard",
  "application",
  "JavaScript",
  "turd",
  "supercalifragilisticexpialidocious",
  "ternary",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//show the hidden word
function displayWord() {
  wordEl.innerHTML = `
${selectedWord
  .split("")
  .map(
    (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
  )
  .join("")}
`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  //   console.log(wordEl.innerText);
  if (innerWord === selectedWord) {
    finalMessageEl.innerText = `Congratulations on winning!!`;
    winEl.style.display = "block";
    popupEl.style.display = "flex";
  }
}

//update the wrong letters div
function updateWrongLettersEl() {
  //display wrong letters
  wrongLetterEl.innerHTML = `
${wrongLetters.length > 0 ? "<p>Wrong; guess again.</p>" : ""}
${wrongLetters.map((letter) => `<span>${letter}</span>`)}
`;

  //display parts for guessing wrong letters
  figurePartEl.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //check if lost
  if (wrongLetters.length === figurePartEl.length) {
    finalMessageEl.innerText = "You have lost the game.";
    loseEl.style.display = "block";
    popupEl.style.display = "flex";
  }
}

//show notification
function showNotification() {
  notificationEl.classList.add("show");
  setTimeout(() => {
    notificationEl.classList.remove("show");
  }, 2500);
}

//keydown letter pess
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//play again button - restrat the game and play again
playAgainBtn.addEventListener("click", () => {
  //empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[(Math.floor(Math.random() * words.length))];
  displayWord();
  updateWrongLettersEl();
  popupEl.style.display = "none";
  winEl.style.display = "none";
  loseEl.style.display = "none";
});

displayWord();
