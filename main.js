//1a.
//create a 52 card deck - 4 suits X 12 card types
//make array of suits(hearts,clubs,spades,diamonds) & card values (2 thru Ace)
//loop through and push to array (deck)
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
    faceUpCard: "6666",
    cardsWon: [],
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
    // opponent.faceUpCard = opponent.deck.length - 1
    console.log(player.faceUpCard)
    console.log(player.deck)
    console.log(opponent.faceUpCard)
    console.log(opponent.deck)
    // console.log(opponent.faceUpCard)
}
flipCard()

//5. compare cards -
//make card rank object? need to rank every card (j==10,Q==11,K==12,A==13)
function cardCompare() {
    let playerCard = parseInt(player.faceUpCard)
    let opponentCard = parseInt(opponent.faceUpCard)
    if (playerCard == opponentCard) {
        console.log("WAAARRR!!")
        //ante 3 cards from top of (end) of player.deck and then invoke flipCard() and cardCompare()

    } else if (playerCard > opponentCard) {
        player.cardsWon.push(player.faceUpCard)
        player.cardsWon.push(opponent.faceUpCard)
        console.log("player wins")
    } else {
        opponent.cardsWon.push(player.faceUpCard)
        opponent.cardsWon.push(opponent.faceUpCard)
        console.log("opponent wins")
    }
}
cardCompare()
console.log(player.cardsWon)
console.log(opponent.cardsWon)

//6. comparison tie trigger "war!"
function warAnte() {
    player.ante = player.deck.splice(player.deck - 1, 3)
    opponent.ante = opponent.deck.splice(opponent.deck - 1, 3)
}