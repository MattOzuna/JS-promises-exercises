// ======================================================================================= //

const getOneCard = () => {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(deck => {
            return axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`)
        })
        .then(card => {
            console.log('=====Get One Card=====')
            console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
        })
        .catch(err => console.log('Error!', err))
}

getOneCard()

// ======================================================================================= //

const twoCardArr = []

const getTwoCard = () => {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(deck => {
            return axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`)
        })
        .then(card1 => {
            twoCardArr.push({
                suit: card1.data.cards[0].suit,
                value: card1.data.cards[0].value
            })
            return axios.get(`https://deckofcardsapi.com/api/deck/${card1.data.deck_id}/draw/?count=1`)
        })
        .then(card2 => {
            twoCardArr.push({
                suit: card2.data.cards[0].suit,
                value: card2.data.cards[0].value
            })
            console.log('=====Get Two Cards=====')
            for (let card = 0; card < twoCardArr.length; card++){
                console.log(`${twoCardArr[card].value} of ${twoCardArr[card].suit}`)
            }
        })
        .catch(err => console.log('Error!', err))
}

getTwoCard()

// ======================================================================================= //

let count = 0

const getDeck = () => {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(deck => {
            return axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=52`)
        })
        .then(cards => {
            for (let card of cards.data.cards){
                $(`<img src="${card.image}" alt="${card.value} of ${card.suit}" class="${count} z-n1 position-absolute">`)
                    .appendTo('.deck-container').hide()
                count ++
                }
            count = 0
            cardsArr = $('.deck-container').children()
        })
        
    }

$('button').on('click', revealCard)

let cardsArr = {}

function revealCard(e){
    e.preventDefault()
    $(`.${count}`).show()
    count ++
}

getDeck()