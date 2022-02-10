const ROOT = document.getElementById("root");

function printGuess(guess, status) {
    const el = document.createElement("div");
    el.classList.add("userguess");
    guess.split("").forEach((letter, index) => {
        const letterEl = document.createElement("div");
        letterEl.classList.add("letter");
        letterEl.innerText = letter;
        switch (status[index]) {
            case 0: letterEl.classList.add('status0');
                break;
            case 1: letterEl.classList.add('status1');
                break;
            case 2: letterEl.classList.add('status2');
                break;
        }
        // alternately
        // letterEl.classList.add(`status${status[index]}`);
        el.appendChild(letterEl);
    });
    ROOT.appendChild(el);
}

function drawGhostInput(word) {
    word = word.toUpperCase().padEnd(5);
    const ghost = document.getElementById("ghost-input");
    word.split("").forEach((l, i) => ghost.children[i].innerText = l);
}