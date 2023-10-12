let deckId
const winningCard = document.getElementById("determineCardWinner")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)

document.getElementById("draw-cards").addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.remaining)
            if (data.remaining === 0) {
                document.getElementById("draw-cards").disabled = true
            }
            remainingCards.innerHTML = `
                <p>Remaining Cards: ${data.remaining}</p>
            `
            document.getElementById("card-slot1").innerHTML = 
            `<img src=${data.cards[0].image} class="card" />`
             document.getElementById("card-slot2").innerHTML = 
            `<img src=${data.cards[1].image} class="card" />`
            winningCard.innerHTML = `
            <h2>${determineCardWinner(data.cards[0], data.cards[1])}</h2>
            `
            
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    console.log("card 1:", card1ValueIndex)
    console.log("card 2:", card2ValueIndex)
    
    if (card1ValueIndex > card2ValueIndex) {
        return "Card 1 wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        return "Card 2 wins!"
    } else {
        return "War!"
    }
}