let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    const WORD_LETTERS = WORD.split("");

    // count frequency of each letter
    var freq = {};
    for (var i = 0; i < 5; i++) {
        if (!freq[WORD_LETTERS[i]]) {
            freq[WORD_LETTERS[i]] = 0;
        }
        freq[WORD_LETTERS[i]]++;
    }
    // console.log(freq);


    guess.split("").forEach(function(letter, index) {

        // TODO: handle additional letters when there are duplicates
        let letterStatus;
        const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
        const isInPlace = WORD_LETTERS[index] === letter;

        if (freq[letter]) {
            if (isInPlace) {
                letterStatus = 2;
                freq[letter]--;
            } else if (existsInWord) {
                letterStatus = 1;
                freq[letter]--;
            } else {
                letterStatus = 0;
            }
        } else {
            letterStatus = 0;
        }
        status.push(letterStatus);
    })
    printGuess(guess, status);
    return status;
}

el.addEventListener("change", function(e) {
    const userInput = e.target.value;
    if (userInput.length === 5 && attempts > 0) {
        const result = registerGuess(userInput);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        attempts--;
        if (result.reduce(reducer) === 10) {
            el.classList.add("hidden");
            const victoryMessage = document.createElement("div");
            victoryMessage.innerText = "You won";
            document.body.appendChild(victoryMessage);
        }
        if (attempts == 0) {
            el.classList.add("hidden");
            const gameOver = document.createElement("div");
            gameOver.innerText = `GAME OVER !!\n THE CORRECT WORD WAS ${WORD} \n Better luck next time !!`;
            document.body.appendChild(gameOver);
        }
    } else {
        alert("Enter 5 letter word")
    }
});