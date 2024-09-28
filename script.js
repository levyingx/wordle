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
    winnerScreen.className = "flex flex-col justify-center items-center w-3/4 h-3/4 bg-gray-800 border border-gray-500 text-gray-300 absolute inset-50 text-2xl";

    const closeButton = document.createElement('button');
    closeButton.className = "flex justify-center items-center w-8 h-8 absolute top-0 right-0 underline";
    closeButton.textContent = "x";
    closeButton.addEventListener("click", function() {
        winnerScreen.remove();
    });
    
    const wordElement = document.createElement('span');
    const message = document.createElement('span');
    wordElement.textContent = `The word is ${word}.`
    message.textContent = `You won in ${user.attempts} attempts!`;
    
    winnerScreen.appendChild(closeButton);
    winnerScreen.appendChild(wordElement); 
    winnerScreen.appendChild(message);

    document.body.appendChild(winnerScreen);
}

function displayWord() {
    const wordElement = document.createElement('div');
    wordElement.className = "flex justify-evenly items-center w-full h-full"
    
    for (let i = 0; i < 5; i++) {
        const letterElement = document.createElement('div');
        letterElement.className = "flex justify-center items-center w-full h-full bg-gray-700 leading-none font-semibold text-3xl box-border select-none ";
        
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
})