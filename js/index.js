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
    var isGreen = [];
    for (var i = 0; i < 5; i++) {
        if (!freq[WORD_LETTERS[i]]) {
            freq[WORD_LETTERS[i]] = 0;
        }
        freq[WORD_LETTERS[i]]++;
        isGreen.push(false);
    }

    // console.log(freq);
    guess.split("").forEach(function(letter, index) {
        if (WORD_LETTERS[index] === letter) {
            isGreen[index] = true;
            freq[letter]--;
            status.push(2);
        } else {
            status.push(0);
        }
    });

    guess.split("").forEach(function(letter, index) {
        // TODO: handle additional letters when there are duplicates
        let letterStatus;
        const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
        if (!isGreen[index]) {
            if (freq[letter] && existsInWord) {
                letterStatus = 1;
                freq[letter]--;
            } else {
                letterStatus = 0;
            }
            status[index] = letterStatus;
        }
    });
    printGuess(guess, status);
    return status;
}

el.focus();

el.addEventListener("blur", function(e) {
    el.focus();
})

document.addEventListener("focus", function(e) {
    el.focus();
})

el.addEventListener("change", function(e) {
    const userInput = e.target.value;
    if (userInput.length === 5) {
        const result = registerGuess(userInput);
        e.target.value = "";
        const event = new Event('input');
        e.target.dispatchEvent(event);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        if (result.reduce(reducer) === 10) {
            el.classList.add("hidden");
            const victoryMessage = document.createElement("div");
            victoryMessage.innerText = "You won";
            document.body.appendChild(victoryMessage);
        }
    } else {
        console.log("Skip this");
    }
});

el.addEventListener("input", function(e) {
    const userInput = e.target.value;
    drawGhostInput(userInput);
});