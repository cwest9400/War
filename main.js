//1a.
//create a 52 card deck - 4 suits X 12 card types
//make array of suits(hearts,clubs,spades,diamonds) & card values (2 thru Ace)
//loop through and push to array (deck)
const startButton = document.querySelector('.startButton')
const FlipButton = document.querySelector('.flip')
const AnteButton = document.querySelector('.ante')

addEventListener
function makeDeck() {
    // let cardType = [' spade', ' club', ' diamond', ' heart']
    // let cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
    let cardType = [' heart']
    let cards = ['2', '3', '4', '5']
    let deck = []
    for (i = 0; i < cardType.length; i++) {
        for (j = 0; j < cards.length; j++) {
            deck.push(cards[j] + cardType[i])
        }
    }
    return (deck)
}
//2.shuffle deck -
//loop through deck and assign random positions?
function shuffleUp(deck) {
    for (i = 0; i < deck.length; i++) {
        let randomCard = deck[i]
        let randomIndex = Math.floor(Math.random() * deck.length)
        deck[i] = deck[randomIndex]
        deck[randomIndex] = randomCard
    }
}
let shuffledDeck = makeDeck()


//3. split deck push half to new array for each player?
//define players - object?
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
    cardsWon: ['4 spade'],
    ante: [],
}
shuffleUp(shuffledDeck)
for (i = 0; i < shuffledDeck.length; i++) {
    if (i < shuffledDeck.length / 2) {
        player.deck.push(shuffledDeck[i])
    } else {
        opponent.deck.push(shuffledDeck[i])
    }
}
console.log(player.deck)
console.log(opponent.deck)


//4. flip card - 
//pop card from top of player deck array
//push to center object array
function flipCard() {

    player.faceUpCard = player.deck[player.deck.length - 1]
    opponent.faceUpCard = opponent.deck[opponent.deck.length - 1]
    player.deck.pop()
    opponent.deck.pop()
    remakeDeckfromCardsWon()


    console.log("player played: " + player.faceUpCard)
    console.log(player.deck)
    console.log("opponent played: " + opponent.faceUpCard)
    console.log(opponent.deck)
    // console.log(opponent.faceUpCard)
}
flipCard()

function playerWins() {
    player.cardsWon.push(player.faceUpCard)
    player.cardsWon.push(opponent.faceUpCard)

    console.log("player wins")

}
function opponentWins() {
    opponent.cardsWon.push(player.faceUpCard)
    opponent.cardsWon.push(opponent.faceUpCard)

    console.log("opponent wins")

}
function playerWinsWar() {
    player.cardsWon.push(player.ante)
    player.cardsWon.push(opponent.ante)

}
function opponentWinsWar() {
    opponent.cardsWon.push(player.ante)
    opponent.cardsWon.push(opponent.ante)

}
function war() {
    warAnte()
    flipCard()
    warCardCompare()
}
//5. compare cards -
//make card rank object? need to rank every card (j==10,Q==11,K==12,A==13)
function warCardCompare() {
    let playerCard = parseInt(player.faceUpCard)
    let opponentCard = parseInt(opponent.faceUpCard)
    if (playerCard == opponentCard) {
        console.log("WAAARRR!!")
        war()
    } else if (playerCard > opponentCard) {
        playerWinsWar()
    } else {
        opponentWinsWar()
    }
    return
}






function cardCompare() {
    let playerCard = parseInt(player.faceUpCard)
    let opponentCard = parseInt(opponent.faceUpCard)
    if (playerCard == opponentCard) {
        console.log("WAAARRR!!")
        war()
    } else if (playerCard > opponentCard) {
        playerWins()
    } else {
        opponentWins()
    }
    return
}
cardCompare()
console.log(player.cardsWon)
console.log(opponent.cardsWon)

//6. comparison tie trigger "war!"
function warAnte() {
    player.ante = player.deck.splice(player.deck.length - 3, 3)
    opponent.ante = opponent.deck.splice(opponent.deck.length - 3, 3)
    remakeDeckfromCardsWon()
    console.log(`player ante: ${player.ante}, opponent ante: ${opponent.ante}`)
    return
}
console.log(`player cards won: ${player.cardsWon}`)
console.log(`opponent cards won: ${opponent.cardsWon}`)

//XXXXXXX7. how to not push empty warAnte strings - if?

//8. when deck runs out - shuffle cardsWon into deck
function remakeDeckfromCardsWon() {
    if (player.deck <= 0) {
        player.deck.push(...player.cardsWon)
    }
    if (opponent.deck <= 0) {
        opponent.deck.push(...opponent.cardsWon)
    }
}

console.log("current deck: " + player.deck)
//win condition
function winCondition() {
    if (player.deck + player.cardsWon <= 0) {
        console.log("Opponent Wins!")
    } else {
        console.log("Player Wins!")
    }
}





//9. identify dom elements & listeners
//      1. shuffle up/start
//      2. flip
//      3. ante        