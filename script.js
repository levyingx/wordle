const mainContainer = document.getElementById("main-container");
const inputElement = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");

let word;

const user = {
    win: false,
    attempts: 0,
    input: "",
}

function showWinnerScreen() {
    const winnerScreen = document.createElement('div');
    winnerScreen.className = "flex flex-col justify-center items-center w-64 h-64 bg-gray-300/75 text-gray-800 rounded-xl absolute inset-50 text-xl select-none";

    const wordElement = document.createElement('span');
    const message = document.createElement('span');
    wordElement.textContent = `The word is ${word}.`
    
    if (user.attempts == 1) {
        message.textContent = `You won in ${user.attempts} attempt!`;
    } else {
        message.textContent = `You won in ${user.attempts} attempts!`;
    }
    
    const playAgain = document.createElement('button');
    playAgain.className = "flex justify-center items-center w-4/6 h-8 p-4 bg-green-500/75 border border-green-500 rounded-full font-semibold transition ease-in-out hover:bg-green-500";
    playAgain.textContent = "Play Again";
    playAgain.addEventListener("click", () => {
        location.reload();
    })

    winnerScreen.appendChild(wordElement); 
    winnerScreen.appendChild(message);
    winnerScreen.appendChild(playAgain);

    document.body.appendChild(winnerScreen);
}

function displayWord() {
    const wordElement = document.createElement('div');
    wordElement.className = "flex justify-evenly items-center w-full h-full"
    
    for (let i = 0; i < 5; i++) {
        const letterElement = document.createElement('div');
        letterElement.className = "flex justify-center items-center w-10 h-10 bg-gray-700 rounded-sm leading-none font-semibold text-3xl box-border select-none ";
        
        if (user.input[i] === word[i]) {
            letterElement.className += "bg-green-500";
        } else if (word.includes(user.input[i]) && user.input[i] !== word[i]) {
            letterElement.className += "bg-yellow-500";
        } else if (user.input[i] != word[i]) {
            letterElement.className += "bg-red-500";
        }
        
        letterElement.textContent = user.input[i];
        wordElement.appendChild(letterElement);          
    }

    mainContainer.appendChild(wordElement);
}

function sanitize(input) {
    const regexp = /[^a-zA-Z]/g;
    let word = input.trim().toUpperCase().replaceAll(regexp, "");
    if (word.length == 5 && user.attempts < 6) {
        return word;
    } else {}
}

function validateInput() {
    user.input = sanitize(inputElement.value);
    user.attempts += 1;
    if (user.input == word) {
        showWinnerScreen();
        displayWord(user.input);
    } else if (user.input !== null) {
        displayWord(user.input);
        inputElement.value = "";
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        validateInput();
    }
});

submitButton.addEventListener("click", function() {
    validateInput(); 
});

window.addEventListener("load", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(json => {
            let wordIndex = getRandomNumber(0, json.wordlist.length);
            word = json.wordlist[wordIndex];
            console.log(word);
        })
});
