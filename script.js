const mainContainer = document.getElementById("main-container");

let word = "SPACE".toUpperCase().split("");
console.log(word);

function wordContainer(wordArray) {
    const container = document.createElement('div');
    container.className = "flex justify-evenly items-center w-full h-1/6 bg-gray-300 rounded-lg"

    for (letter in wordArray) {
        const letterContainer = document.createElement('div');
        letterContainer.className = "flex justify-center items-center w-1/6 h-3/4 bg-gray-400 rounded-xl text-gray-200 font-semibold text-3xl box-border select-none";
        letterContainer.textContent = wordArray[letter];
        container.appendChild(letterContainer);          
    }

    mainContainer.appendChild(container);
}

wordContainer(word);

// word is max. 5 letters
// 6 chances
// sanitize word before manipulating it

/* additional features:

// json with a lot of 5 letter words 
// pick one random word from json each day


*/