const startButton = document.querySelector('.startButton')
const flipButton = document.querySelector('.flip')
const anteButton = document.querySelector('.ante')
const warButton = document.querySelector('.warButton')
const opponentDeckSize = document.querySelector('#opponentDeckSize')
const playerDeckSize = document.querySelector('#playerDeckSize')
const playerCardsWonSelector = document.querySelector('#playerCardsWon')
const opponentCardsWonSelector = document.querySelector('#opponentCardsWon')
const compareOutcomeMessage = document.querySelector('#compareOutcome')
const playerWarAnteCount = document.querySelector('#playerWarAnteCount')
const opponentWarAnteCount = document.querySelector('#opponentWarAnteCount')
const playerCardView = document.querySelector('#playerCardView')
const opponentCardView = document.querySelector('#opponentCardView')
const winMessage = document.querySelector('#winMessage')
flipButton.disabled = true
anteButton.disabled = true
warButton.disabled = true

let opponent = {
    name: "Opponent",
    deck: [],
    faceUpCard: "",
    cardsWon: [],
    ante: [],
}

let player = {
    name: "player",
    deck: [],
    faceUpCard: "",
    cardsWon: [],
    ante: [],
}

function winCondition() {
    if (player.deck.length + player.cardsWon.length <= 0) {
        winMessage.textContent = " GAME WINNER: Opponent!"
        startButton.disabled = false
        flipButton.disabled = true
        anteButton.disabled = true
        warButton.disabled = true
        clearMessage()
    } else if (opponent.deck.length + opponent.cardsWon.length <= 0) {
        winMessage.textContent = " GAME WINNER: PLAYER!"
        startButton.disabled = false
        flipButton.disabled = true
        anteButton.disabled = true
        warButton.disabled = true
        clearMessage()
    }
}

function makeDeck() {
    let cardType = [' spade', ' club']
    let cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
    let deck = []
    for (i = 0; i < cardType.length; i++) {
        for (j = 0; j < cards.length; j++) {
            deck.push(cards[j] + cardType[i])
        }
    }
    return (deck)
}

function shuffleUp(deck) {
    for (i = 0; i < deck.length; i++) {
        let randomCard = deck[i]
        let randomIndex = Math.floor(Math.random() * deck.length)
        deck[i] = deck[randomIndex]
        deck[randomIndex] = randomCard
    }
}

let mainDeck = makeDeck()

shuffleUp(mainDeck)
function splitShuffledMainDeck() {
    for (i = 0; i < mainDeck.length; i++) {
        if (i < mainDeck.length / 2) {
            player.deck.push(mainDeck[i])
        } else {
            opponent.deck.push(mainDeck[i])
        }
    }
    startButton.disabled = true
    playerDeckSize.textContent = player.deck.length
    opponentDeckSize.textContent = opponent.deck.length
    flipButton.disabled = false
    winMessage.textContent = ""
    compareOutcomeMessage.textContent = ""
}

function flipCard() {
    player.faceUpCard = player.deck[player.deck.length - 1]
    opponent.faceUpCard = opponent.deck[opponent.deck.length - 1]
    playerCardView.textContent = player.faceUpCard
    opponentCardView.textContent = opponent.faceUpCard
    player.deck.pop()
    opponent.deck.pop()
    setTimeout(function () { cardCompare() }, 900)
    if (player.deck.length <= 1 || opponent.deck.length <= 1) {
        setTimeout(function () { remakeDeckfromCardsWon() }, 1000)
    }
    playerDeckSize.textContent = player.deck.length
    opponentDeckSize.textContent = opponent.deck.length
    winCondition()
    clearMessage()
}

function warFlipCard() {
    player.faceUpCard = player.deck[player.deck.length - 1]
    opponent.faceUpCard = opponent.deck[opponent.deck.length - 1]
    playerCardView.textContent = player.faceUpCard
    opponentCardView.textContent = opponent.faceUpCard
    player.deck.pop()
    opponent.deck.pop()
    setTimeout(function () { warCardCompare() }, 700)
    if (player.deck.length <= 1 || opponent.deck.length <= 1) {
        setTimeout(function () { remakeDeckfromCardsWon() }, 1000)
    }
    playerDeckSize.textContent = player.deck.length
    opponentDeckSize.textContent = opponent.deck.length
    winCondition()
    clearMessage()
}

function clearMessage() {
    compareOutcomeMessage.innerHTML = ""
}

function playerWins() {
    player.cardsWon.push(player.faceUpCard)
    player.cardsWon.push(opponent.faceUpCard)
    player.faceUpCard = ""
    opponent.faceUpCard = ""
    compareOutcomeMessage.innerHTML = "Player had the high card!"
    playerCardView.textContent = player.faceUpCard
    opponentCardView.textContent = opponent.faceUpCard
}

function opponentWins() {
    opponent.cardsWon.push(player.faceUpCard)
    opponent.cardsWon.push(opponent.faceUpCard)
    player.faceUpCard = ""
    opponent.faceUpCard = ""
    compareOutcomeMessage.innerHTML = "Opponent had the high card!"
    playerCardView.textContent = player.faceUpCard
    opponentCardView.textContent = opponent.faceUpCard
}

function playerWinsWar() {
    player.cardsWon.push(player.faceUpCard)
    player.cardsWon.push(opponent.faceUpCard)
    player.cardsWon.push(...player.ante)
    player.cardsWon.push(...opponent.ante)
    player.faceUpCard = ""
    opponent.faceUpCard = ""
    player.ante = []
    opponent.ante = []
    playerCardView.textContent = player.faceUpCard
    opponentCardView.textContent = opponent.faceUpCard
    playerWarAnteCount.textContent = ""
    opponentWarAnteCount.textContent = ""
    compareOutcomeMessage.innerHTML = "player had the high card!"
    flipButton.disabled = false
    warButton.disabled = true
}

function opponentWinsWar() {
    opponent.cardsWon.push(player.faceUpCard)
    opponent.cardsWon.push(opponent.faceUpCard)
    opponent.cardsWon.push(...player.ante)
    opponent.cardsWon.push(...opponent.ante)
    player.faceUpCard = ""
    opponent.faceUpCard = ""
    player.ante = []
    opponent.ante = []
    playerCardView.textContent = player.faceUpCard
    opponentCardView.textContent = opponent.faceUpCard
    playerWarAnteCount.textContent = ""
    opponentWarAnteCount.textContent = ""
    compareOutcomeMessage.innerHTML = "Opponent had the high card!"
    flipButton.disabled = false
    warButton.disabled = true
}

function war() {
    anteButton.disabled = false
    warButton.disabled = true
}

function warCardCompare() {
    let playerCard = parseInt(player.faceUpCard)
    let opponentCard = parseInt(opponent.faceUpCard)
    if (playerCard == opponentCard) {
        compareOutcomeMessage.innerHTML = "War AgaINNN!!!!..?"
        war()
        flipButton.disabled = true
    } else if (playerCard > opponentCard) {
        playerWinsWar()
    } else {
        opponentWinsWar()
    }
    playerCardsWonSelector.textContent = player.cardsWon.length
    opponentCardsWonSelector.textContent = opponent.cardsWon.length
    return
}

function cardCompare() {
    let playerCard = parseInt(player.faceUpCard)
    let opponentCard = parseInt(opponent.faceUpCard)
    if (playerCard == opponentCard) {
        compareOutcomeMessage.innerHTML = "WaaRRR!!!!..?"
        war()
        flipButton.disabled = true
    } else if (playerCard > opponentCard) {
        playerWins()
    } else {
        opponentWins()
    }
    playerCardsWonSelector.textContent = player.cardsWon.length
    opponentCardsWonSelector.textContent = opponent.cardsWon.length
    return
}

function warAnte() {
    if (player.deck.length <= 3) {
        setTimeout(function () { remakeDeckfromCardsWon() }, 1000)
    }
    if (opponent.deck.length <= 3) {
        setTimeout(function () { remakeDeckfromCardsWon() }, 1000)
    }
    player.ante = player.deck.splice(player.deck.length - 3, 3)
    opponent.ante = opponent.deck.splice(opponent.deck.length - 3, 3)
    player.ante.push(player.faceUpCard)
    opponent.ante.push(opponent.faceUpCard)
    player.faceUpCard = []
    opponent.faceUpCard = []
    playerWarAnteCount.textContent = player.ante.length
    opponentWarAnteCount.textContent = opponent.ante.length
    playerCardView.textContent = ""
    opponentCardView.textContent = ""
    anteButton.disabled = true
    playerDeckSize.textContent = player.deck.length
    opponentDeckSize.textContent = opponent.deck.length
    warButton.disabled = false
    return
}

function remakeDeckfromCardsWon() {
    if (player.deck <= 0) {
        player.deck.push(...player.cardsWon)
        player.cardsWon = []
        playerCardsWonSelector.textContent = player.cardsWon.length
        playerDeckSize.textContent = player.deck.length
    }
    if (opponent.deck <= 0) {
        opponent.deck.push(...opponent.cardsWon)
        opponent.cardsWon = []
        opponentCardsWonSelector.textContent = opponent.cardsWon.length
        opponentDeckSize.textContent = opponent.deck.length
    }
}

startButton.addEventListener('click', shuffleUp(mainDeck))
startButton.addEventListener('click', splitShuffledMainDeck)
flipButton.addEventListener('click', flipCard)
anteButton.addEventListener('click', warAnte)
warButton.addEventListener('click', warFlipCard)