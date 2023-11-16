//GET WORD OF THE DAY
async function getWordOfTheDay() {
  const response = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await response.json();
  return data.word;
}

let wordOfTheDay;
getWordOfTheDay().then((word) => (wordOfTheDay = word));

//VALIDATE WORD
async function validateWord(word) {
  const request = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({
      word,
    }),
  });
  const data = await request.json();
  return data.validWord;
}

//GET GUESS WORD
function getGuessWord() {
  const cells = document.querySelectorAll(".cell");
  let words = [];
  let indexes = [];
  let word = "";
  for (let i = 1; i <= cells.length; i++) {
    word += cells[i - 1].innerText;
    indexes.push(i);

    if (i % 5 === 0 && word !== "") {
      words.push({ word: word.toLowerCase(), indexes });
      word = "";
      indexes = [];
    }
  }
  return words[words.length - 1];
}

//CHECK IS KEY IS LETTER
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

//CHECK FOR MATCH BTW LAST WORD AND WORD OF THE DAY
function matchingWords(wordOfTheDay, guessWord) {
  let match = [];
  let copy = wordOfTheDay;

  for (let i = 0; i < wordOfTheDay.length; i++) {
    let index = copy.indexOf(guessWord[i]);
    if (wordOfTheDay[i] === guessWord[i]) {
      match.push(1);
      copy = copy.slice(0, index) + copy.slice(index + 1);
    } else if (copy.includes(guessWord[i])) {
      match.push(0);
      copy = copy.slice(0, index) + copy.slice(index + 1);
    } else {
      match.push(-1);
    }
  }
  return match;
}

//REFLECT MATHES
function reflectMatches(matches, indexes) {
  for (i = 0; i < matches.length; i++) {
    if (matches[i] === 1) {
      document.querySelector(`.c${indexes[i]}`).style.backgroundColor = "green";
    } else if (matches[i] === 0) {
      document.querySelector(`.c${indexes[i]}`).style.backgroundColor =
        "orange";
    } else {
      document.querySelector(`.c${indexes[i]}`).style.backgroundColor = "grey";
    }
  }
}

function invalidWord(count, color) {
  for (i = count - 5; i < count; i++) {
    document.querySelector(`.c${i}`).style.backgroundColor = color;
  }
}

//SELECT LOADER
const loader = document.querySelector(".loader");

//ACCEPT INPUT
let count = 0;
let stop = 0;
let pause = false;
document.addEventListener("keydown", async function (event) {
  if (!isLetter(event.key)) {
    if (event.key === "Backspace" && count > stop && !pause) {
      document.querySelector(`.c${count}`).innerText = "";
      count--;
    } else if (event.key === "Enter" && count % 5 === 0) {
      const { word: guessWord, indexes } = getGuessWord();

      loader.style.color = "black";
      const validWord = await validateWord(guessWord);
      loader.style.color = "white";

      if (validWord) {
        const matches = matchingWords(wordOfTheDay, guessWord);
        reflectMatches(matches, indexes);
        stop = count;
        if (JSON.stringify(matches) === JSON.stringify([1, 1, 1, 1, 1])) {
          document.querySelector(".title").classList.add("anime");
          alert("YOU WIN");
        }
        if (stop === 30) {
          alert("You have lost!");
        }
      } else {
        pause = true;
        invalidWord(count + 1, "red");
        setTimeout(() => {
          invalidWord(count + 1, "white");
          pause = false;
        }, 1000);
      }
      event.preventDefault();
    }
  } else {
    if (count < stop + 5) {
      document.querySelector(`.c${count + 1}`).innerText =
        event.key.toUpperCase();
      count++;
    }
  }
});
