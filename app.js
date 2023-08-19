const GREEK_LETTERS = [
    {"lower": "α", "upper": "Α", "name": "alfa", "afi": "/a/"},
    {"lower": "β", "upper": "Β", "name": "beta", "afi": "/b/"},
    {"lower": "γ", "upper": "Γ", "name": "gamma", "afi": "/g/"},
    {"lower": "δ", "upper": "Δ", "name": "delta", "afi": "/d/"},
    {"lower": "ε", "upper": "Ε", "name": "épsilon", "afi": "/e/ breve"},
    {"lower": "ζ", "upper": "Ζ", "name": "dseta", "afi": "/ds/"},
    {"lower": "η", "upper": "Η", "name": "eta", "afi": "/e/ larga"},
    {"lower": "θ", "upper": "Θ", "name": "theta", "afi": "/θ/"},
    {"lower": "ι", "upper": "Ι", "name": "iota", "afi": "/i/"},
    {"lower": "κ", "upper": "Κ", "name": "kappa", "afi": "/k/"},
    {"lower": "λ", "upper": "Λ", "name": "lambda", "afi": "/l/"},
    {"lower": "μ", "upper": "Μ", "name": "mu", "afi": "/m/"},
    {"lower": "ν", "upper": "Ν", "name": "nu", "afi": "/n/"},
    {"lower": "ξ", "upper": "Ξ", "name": "xi", "afi": "/ks/"},
    {"lower": "ο", "upper": "Ο", "name": "ómicron", "afi": "/o/ breve"},
    {"lower": "π", "upper": "Π", "name": "pi", "fonema": "p", "afi": "/p/"},
    {"lower": "ρ", "upper": "Ρ", "name": "rho", "afi": "/ɾ/"},
    {"lower": "σ/ς", "upper": "Σ", "name": "sigma", "afi": "/s/"},
    {"lower": "τ", "upper": "Τ", "name": "tau", "afi": "/t/"},
    {"lower": "υ", "upper": "Υ", "name": "upsilon", "afi": "/y/"},
    {"lower": "φ", "upper": "Φ", "name": "phi", "afi": "/f/"},
    {"lower": "χ", "upper": "Χ", "name": "chi", "afi": "/x/"},
    {"lower": "ψ", "upper": "Ψ", "name": "psi", "afi": "/ps/"},
    {"lower": "ω", "upper": "Ω", "name": "omega", "afi": "/o/ larga"}
];

function showPopup(letter) {
    let greek = findLetterByName(letter);
    if (game_mode === false || greek.index < game_index) {
        const popup = document.getElementById("popup");
        popup.style.display = "block";
        placeTextOnId('letter_name', capitalizeFirstLetter(greek.letter.name));
        placeTextOnId('letter_lower', greek.letter.lower);
        placeTextOnId('letter_upper', greek.letter.upper);
        placeTextOnId('afi', capitalizeFirstLetter(greek.letter.afi));
    }
}

function placeTextOnId(id, text) {
    let element = document.getElementById(id);
    element.innerText = text;
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function findLetterByName(letterName) {
    const foundIndex = GREEK_LETTERS.findIndex(letter => letter.name === letterName);
    if (foundIndex !== -1) {
        return {letter: GREEK_LETTERS[foundIndex], index: foundIndex};
    }
    return null;
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

const letters = document.querySelectorAll(".letter");
letters.forEach(letter => {
    letter.addEventListener("click", () => {
        showPopup(letter.id);
    });
});

const closePopupButton = document.getElementById("popup");
closePopupButton.addEventListener("click", closePopup);

const start = document.getElementById("start");
start.addEventListener("click", startGame);

const next = document.getElementById("next");
next.addEventListener("click", gameStep);

const all = document.getElementById("all");
all.addEventListener("click", drawAll);

function drawAll() {
    placeTextOnId('start', '▶');
    placeTextOnId('next', '');
    placeTextOnId('all', '');
    game_mode = false;
    game_index = 0;
    GREEK_LETTERS.forEach(letter => {
        placeTextOnId(letter.name, `${letter.lower} ${letter.upper}`);
    });
}

function clear() {
    document.querySelectorAll('.letter').forEach(e => {
        e.innerText = '';
    })
}

let game_mode = false;
let game_index = 0;

function gameStep() {
    if (game_index >= GREEK_LETTERS.length) {
        startGame();
    } else {
        let letter = GREEK_LETTERS[game_index];
        placeTextOnId(letter.name, `${letter.lower} ${letter.upper}`);
        game_index++;
    }
}

function resetGame() {
    game_mode = false;
    closePopup();
    drawAll();
}

function startGame() {
    game_mode = true;
    game_index = 0;
    placeTextOnId('start', '▶');
    placeTextOnId('next', '⇥');
    placeTextOnId('all', '↺');
    clear();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "c") {
        startGame();
    }

    if (e.key === "Escape") {
        closePopup();
    }

    if (e.key === "Enter") {
        resetGame();
    }

    if (game_mode && e.key === " ") {
        gameStep();
    }
});

drawAll();