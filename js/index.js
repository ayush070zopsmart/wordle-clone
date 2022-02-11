let attempts = 6;
const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];
const el = document.querySelector("#guess");
var colorStatus = {};

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    const WORD_LETTERS = WORD.split("");
    var freq = {};
    var isGreen = [];
    for (var i = 0; i < 5; i++) {
        if (!freq[WORD_LETTERS[i]]) {
            freq[WORD_LETTERS[i]] = 0;
        }
        freq[WORD_LETTERS[i]]++;
        isGreen.push(false);
    }

    guess.split("").forEach(function(letter, index) {
        if (WORD_LETTERS[index] === letter) {
            isGreen[index] = true;
            freq[letter]--;
            status.push(2);
            colorStatus[letter] = 2;
        } else {
            colorStatus[letter] = colorStatus[letter] === 2 ? 2 : 0;
            status.push(0);
        }
        document.querySelector(`#${letter}`).classList.add(`status${colorStatus[letter]}`);
    });

    guess.split("").forEach(function(letter, index) {
        let letterStatus;
        const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
        if (!isGreen[index]) {
            if (freq[letter] && existsInWord) {
                colorStatus[letter] = colorStatus[letter] === 2 ? 2 : 1;
                letterStatus = 1;
                freq[letter]--;
            } else {
                letterStatus = 0;
                colorStatus[letter] = colorStatus[letter] === 2 ? 2 : 0;
            }
            status[index] = letterStatus;
        }
        document.querySelector(`#${letter}`).classList.add(`status${colorStatus[letter]}`);
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
    var isWon = false;
    if (userInput.length === 5 && attempts > 0) {
        const result = registerGuess(userInput);
        e.target.value = "";
        const event = new Event('input');
        e.target.dispatchEvent(event);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        attempts--;
        const finalInput = document.querySelector("#ghost-input");
        if (result.reduce(reducer) === 10) {
            el.classList.add("hidden");
            finalInput.classList.add("hidden");
            isWon = !isWon;
            const victoryMessage = document.createElement("div");
            victoryMessage.classList.add("won");
            victoryMessage.innerText = "You won";
            document.body.appendChild(victoryMessage);
        }
        if (attempts == 0 && !isWon) {

            finalInput.classList.add("hidden");
            el.classList.add("hidden");
            const gameOver = document.createElement("div");
            gameOver.classList.add("lose");
            gameOver.innerHTML = `<h3>GAME OVER !!<br> THE CORRECT WORD WAS <span>${WORD}</span> <br> Better luck next time !!</h3>`;
            document.body.appendChild(gameOver);
        }
    } else {
        alert("Enter 5 letter word");
        console.log("Skip this");
    }
});

el.addEventListener("input", function(e) {
    const userInput = e.target.value;
    drawGhostInput(userInput);
});

function addtoInput(letter) {
    console.log(letter);
    if (letter === 'ENTER') {
        el.dispatchEvent(new Event("change"));
    } else {
        if (letter === 'CANCEL') {
            el.value = el.value.slice(0, -1);
        } else {
            if (el.value.length < 5)
                el.value += letter;
        }
        drawGhostInput(el.value);
    }
}

function displayKeyboard() {
    const keys = ['QWERTYUIOP', 'ASDFGHJKL', 'ENTER', 'ZXCVBNM', 'CANCEL'];
    let i = 1;
    keys.map((e) => {
        if (e === 'ENTER' || e === 'CANCEL') {
            let alpha = document.createElement("div");
            alpha.classList.add("special_char");
            alpha.innerText = e;
            document.getElementById("key3").appendChild(alpha).addEventListener("click", function(e) {
                addtoInput(alpha.innerText);
            });
            i--;
        } else {
            e.split("").forEach(function(letter, index) {
                let alpha = document.createElement("div");
                alpha.classList.add("line");
                alpha.setAttribute("id", letter);
                alpha.innerText = letter;
                document.getElementById(`key${i}`).appendChild(alpha).addEventListener("click", function(e) {
                    addtoInput(letter);
                });
            });
        }
        i++;
    })

}