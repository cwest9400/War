//1a.
//create a 52 card deck - 4 suits X 12 card types
//make array of suits(hearts,clubs,spades,diamonds) & card values (2 thru Ace)
//loop through and push to array (deck)
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

function makeDeck() {
    let cardType = [' spade', ' club', ' diamond', ' heart']
    let cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
    let deck = []
    for (i = 0; i < cardType.length; i++) {
        for (j = 0; j < cards.length; j++) {
            deck.push(cards[j] + cardType[i])
        }
    }
    return (deck)
}

//2.shuffle deck - loop through deck and assign random positions
function shuffleUp(deck) {
    for (i = 0; i < deck.length; i++) {
        let randomCard = deck[i]
        let randomIndex = Math.floor(Math.random() * deck.length)
        deck[i] = deck[randomIndex]
        deck[randomIndex] = randomCard
    }
}

let mainDeck = makeDeck()

//3. split deck push half to new array for each player
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
}


//4. flip card - 
function flipCard() {

    player.faceUpCard = player.deck[player.deck.length - 1]
    opponent.faceUpCard = opponent.deck[opponent.deck.length - 1]
    playerCardView.textContent = player.faceUpCard
    opponentCardView.textContent = opponent.faceUpCard

    player.deck.pop()
    opponent.deck.pop()

    setTimeout(function () { cardCompare() }, 700)
    if (player.deck.length <= 1 || opponent.deck.length <= 1) {
        setTimeout(function () { remakeDeckfromCardsWon() }, 1000)
    }



    playerDeckSize.textContent = player.deck.length
    opponentDeckSize.textContent = opponent.deck.length

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

}


function playerWins() {
    player.cardsWon.push(player.faceUpCard)
    player.cardsWon.push(opponent.faceUpCard)
    player.faceUpCard = ""
    opponent.faceUpCard = ""
    compareOutcomeMessage.innerHTML = "Player wins!!!!"
    playerCardView.textContent = player.faceUpCard
    opponentCardView.textContent = opponent.faceUpCard

}
function opponentWins() {
    opponent.cardsWon.push(player.faceUpCard)
    opponent.cardsWon.push(opponent.faceUpCard)
    player.faceUpCard = ""
    opponent.faceUpCard = ""
    compareOutcomeMessage.innerHTML = "Opponent wins!!!!"
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
    compareOutcomeMessage.innerHTML = "Player wins War!!!!"

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
    compareOutcomeMessage.innerHTML = "Player wins War!!!!"

    flipButton.disabled = false
    warButton.disabled = true

}
function war() {
    anteButton.disabled = false
    warButton.disabled = true


}
//5. compare cards -
//make card rank object? need to rank every card (j==10,Q==11,K==12,A==13)
function warCardCompare() {
    let playerCard = parseInt(player.faceUpCard)
    let opponentCard = parseInt(opponent.faceUpCard)
    // playerWarAnteCount.textContent = player.ante.length
    // opponentWarAnteCount.textContent = opponent.ante.length
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

// console.log(player.cardsWon)
// console.log(opponent.cardsWon)

//6. comparison tie trigger "war!"
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
    
    // console.log(`player ante: ${player.ante}, opponent ante: ${opponent.ante}`)
    anteButton.disabled = true
    // flipButton.disabled = false
    playerDeckSize.textContent = player.deck.length
    opponentDeckSize.textContent = opponent.deck.length
    warButton.disabled = false
    
    // setTimeout(function () { warCardCompare() }, 700)


    return
}
// console.log(`player cards won: ${player.cardsWon}`)
// console.log(`opponent cards won: ${opponent.cardsWon}`)

//XXXXXXX7. how to not push empty warAnte strings - if?

//8. when deck runs out - shuffle cardsWon into deck
function remakeDeckfromCardsWon() {
    if (player.deck <= 0) {
        player.deck.push(...player.cardsWon)
        player.cardsWon = []
        playerCardsWonSelector.textContent = player.cardsWon.length
        playerDeckSize.textContent = player.deck.length
        // compareOutcomeMessage.textContent = "Player is out of cards - Time to reshuffle"
    }
    if (opponent.deck <= 0) {
        opponent.deck.push(...opponent.cardsWon)
        opponent.cardsWon = []
        opponentCardsWonSelector.textContent = opponent.cardsWon.length
        opponentDeckSize.textContent = opponent.deck.length
        // compareOutcomeMessage.textContent = "Opponent is out of cards - Time to reshuffle"
    }

}


//win condition
function winCondition() {
    if (player.deck + player.cardsWon <= 0) {
        console.log("GAME WINNER: PLAYER!")
    } else {
        console.log("GAME WINNER: OPPONENT!")
    }
    startButton.disabled = false
    flipButton.disabled = true
    anteButton.disabled = true
    warButton.disabled = true
}
winCondition()



//9. identify dom elements & listeners
startButton.addEventListener('click', shuffleUp(mainDeck))
startButton.addEventListener('click', splitShuffledMainDeck)
flipButton.addEventListener('click', flipCard)
anteButton.addEventListener('click', warAnte)
warButton.addEventListener('click', warFlipCard)