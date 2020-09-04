//global variables to get html elements
const wordEl = document.querySelector("#word");
const wrongLetterEl = document.querySelector("#wrong-letters");
const playAgainBtn = document.querySelector("#play-again");
const popupEl = document.querySelector("#popup-container");
const notificationEl = document.querySelector("#notification-container");
const finalMessageEl = document.querySelector("#final-message");
const figurePartEl = document.querySelectorAll(".figure-part");

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

const innerWord = wordEl.innerText.replace(/\n/g, ""/)
console.log(wordEl.innerText);
if(innerWord === selectedWord) {
    finalMessageEl.innerText = "Congratulations on winning!!\n &#128513;";
}

}

displayWord();
