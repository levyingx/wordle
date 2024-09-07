const mainContainer = document.getElementById("main-container");
const inputElement = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");

const word = "SPACE";

const user = {
    attempts: 0,
    input: ""
}

function displayWord() {
    const wordElement = document.createElement('div');
    wordElement.className = "flex justify-evenly items-center w-full h-1/6 aspect-square"
    
    for (let i = 0; i < 5; i++) {
        const letterElement = document.createElement('div');
        letterElement.className = "flex justify-center items-center w-1/6 h-3/4 bg-gray-700 font-semibold text-3xl box-border select-none ";
        if (user.input[i] === word[i]) {
            letterElement.className += "bg-green-500";
            console.log(user.input[i], "GREEN");
        } else if (word.includes(user.input[i]) && user.input[i] !== word[i]) {
            letterElement.className += "bg-yellow-500";
            console.log(user.input[i], "YELLOW")
        } else if (user.input[i] != word[i]) {
            letterElement.className += "bg-red-500";
            console.log(user.input[i], "RED");
        }
        
        letterElement.textContent = user.input[i];
        wordElement.appendChild(letterElement);          
    }

    mainContainer.appendChild(wordElement);
}

function sanitize(input) {
    const regexp = /[^a-zA-Z]/g;
    let word = input.trim().toUpperCase().replaceAll(regexp, "");
    if (input.length == 5 && user.attempts < 6) {
        return word;
    } else {
        
    }
}

// function checkWord() {
//     if (user.input === word) {
//         console.log("ITS THE WORD!!1!")
//     } else {    
//         for (let i in user.input) {
            
//         }    
//     }
// }

function validateInput() {
    user.input = sanitize(inputElement.value);
    if (user.input !== null) {
        displayWord(user.input);
        user.attempts += 1;
        inputElement.value = "";
    }
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        validateInput();
    }
});

submitButton.addEventListener("click", function() {
    validateInput(); 
});