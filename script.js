const mainContainer = document.getElementById("main-container");
const inputElement = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");

const actualWord = "SPACE";
actualWord.toUpperCase().split("");

let attempts = 0;

function wordContainer(word) {
    const container = document.createElement('div');
    container.className = "flex justify-evenly items-center w-full h-1/6 rounded-lg"

    for (let i = 0; i < word.length; i++) {
        const letterContainer = document.createElement('div');
        letterContainer.className = "flex justify-center items-center w-1/6 h-3/4 bg-gray-700 rounded-xl text-gray-200 font-semibold text-3xl box-border select-none";
        letterContainer.textContent = word[i];
        container.appendChild(letterContainer);          
    }

    mainContainer.appendChild(container);
}

function sanitize(input) {
    const regexp = /[^a-zA-Z]/g;
    let word = input.trim().toUpperCase().replaceAll(regexp, "");
    return word;
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const userInput = sanitize(inputElement.value);
        
        if (userInput.length == 5 && attempts < 6) {
            inputElement.value = "";
            wordContainer(userInput);
            attempts++;
        }
    }
})

submitButton.addEventListener("click", function() {
    const userInput = sanitize(inputElement.value);
        
        if (userInput.length == 5 && attempts < 6) {
            inputElement.value = "";
            wordContainer(userInput);
            attempts++;
        }
});



// word is max. 5 letters
// 6 chances
// sanitize word before manipulating it

/* additional features:

// json with a lot of 5 letter words 
// pick one random word from json each day


*/