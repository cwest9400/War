//1. make a deck - any deck
//make array of values
//loop through and push to new array (deck)
let cards = ['a', 'b', 'c', 'd', 'e', '1', 'a']
let cardType = ['red', 'black']
let deck = []

for (i = 0; i < cards.length; i++) {
    for (j = 0; j < cardType.length; j++) {
        deck.push(cards[i] + cardType[j])

    }
    // console.log(cards[i])

}
console.log(deck)


//1a.
//create a 52 card deck - 4 suits X 12 card types
let 
//make array of suits(hearts,clubs,spades,diamonds) & card values (2 thru Ace)
//loop through and push to array (deck)

//2.shuffle deck - 
//loop through deck and assign random positions?


//3. split deck push half to new array for each player?
//define players - object?

//4. flip card - 
//pop card from top of player deck array
//push to center object array