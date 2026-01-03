const emojis = ["🍎", "🍌", "🍇", "🍓", "🍋", "🍉", "🍒", "🍍"];
let cards = [...emojis, ...emojis];

let gameContainer = document.getElementById("game-container");
let restartBtn = document.getElementById("restart-btn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupGame() {
    gameContainer.innerHTML = "";
    shuffle(cards);

    cards.forEach(emoji => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.innerHTML = "";
        gameContainer.appendChild(card);

        card.addEventListener("click", () => flipCard(card));
    });
}

function flipCard(card) {
    if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.innerHTML = card.dataset.emoji;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
    let match = firstCard.dataset.emoji === secondCard.dataset.emoji;

    if (match) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetRound();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
            resetRound();
        }, 1000);
    }
}

function resetRound() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartBtn.addEventListener("click", setupGame);

// Start game on load
setupGame();
