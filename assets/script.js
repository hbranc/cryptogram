const button = document.querySelector("#scramble");

function scrambledWords(word) {
    if (word.length < 2) {
        return word;
    }
    //! means no dont put this character
    const allLetters = word.split("").filter((char) => char !== " ");

    for (let index = allLetters.length - 1; index > 0; index--) {
        const characters = Math.floor(Math.random() * (index + 1));
        [allLetters[index], allLetters[characters]] = [allLetters[characters], allLetters[index]];
    }
    return allLetters.join("");
}

function scrambleText(string) {
    const userText = string;
    let scrambledSentence = "";
    let spaces = "";
    const wordsAndPunctuation = userText.match(/[a-z']+|\S/gi);

    wordsAndPunctuation.forEach(wordsOrPunctuation => {
        if (wordsOrPunctuation.match(/\w/)) {
            const scrambledWord = scrambledWords(wordsOrPunctuation);
            scrambledSentence += spaces + scrambledWord;
        }
        else {
            scrambledSentence += wordsOrPunctuation;
        }
        spaces = " ";
    });
    document.getElementById('scrambled_words').placeholder = scrambledSentence;
}

function shuffleMono(string) {
    const shuffle = string.split("");
    let currentIndex = shuffle.length;
    let temporary;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporary = shuffle[currentIndex];
        shuffle[currentIndex] = shuffle[randomIndex];
        shuffle[randomIndex] = temporary;
    }
    return shuffle.join("");
}

function monoAlphabet(string) {
    const input = string.toUpperCase();
    let cryptogram = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const cypher = shuffleMono(alphabet);

    for (let i = 0; i < input.length; i++) {
        let char = alphabet.indexOf(input[i]);
        if (char > -1) {
            cryptogram += cypher[char];
        }
        else {
            cryptogram += input[i];
        }
    }
    document.getElementById("scrambled_words").placeholder = cryptogram;
}

button.addEventListener("click", () => {
    const textarea = document.getElementById("cryptogram").value;
    const one_radio = document.querySelector('input[name="requirement"]:checked');
    if (one_radio !== null) {
        const radio = one_radio.value;
        if (textarea !== "") {
            if (radio === "scramble") {
                scrambleText(textarea);
            }
            else if (radio === "mono_alphabet") {
                monoAlphabet(textarea);

            }
            else if (radio === "ceaser") {
                alert ("still cooking ):<");    
            }
        }
        else {
            alert("Please write something");
        }
    } else {
        alert("Please Check An Option");
    }
});