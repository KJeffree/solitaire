import React from 'react';
import DrawCardContainer from './DrawCardContainer';
import AceCardContainer from './AceCardContainer';
import CardPlayContainer from './CardPlayContainer';

class SolitaireContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCards: [],
            cards: {
                drawPile: {
                    toDraw: [],
                    drawn: []
                },
                inPlay: {
                    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
                },
                ace: {
                    "HEARTS": [], "DIAMONDS": [], "SPADES": [], "CLUBS": []
                }
            },
            selectedCard: null

        }
        this.dealCards = this.dealCards.bind(this)
        this.drawCard = this.drawCard.bind(this)
        this.handleCardClick = this.handleCardClick.bind(this)
        this.selectCardFromDrawPile = this.selectCardFromDrawPile.bind(this)
    }

    handleCardClick(position, columnNumber = null) {
        if (position === "drawPile"){
            this.drawCard()  
        } else if (position === "drawn"){
            this.selectCardFromDrawPile()
        } else if (position === "inPlay"){
            this.selectCardFromInPlay(columnNumber)
        } else {

        }
    }

    selectCardFromDrawPile(){
        let newAllCards = this.state.cards
        const selectedCard = newAllCards.drawPile.drawn[newAllCards.drawPile.drawn.length - 1]
        if (selectedCard === this.state.selectedCard){
            this.setState({selectedCard: null})
            newAllCards.drawPile.drawn[newAllCards.drawPile.drawn.length - 1].hilighted = false
        } else {
            newAllCards.drawPile.drawn[newAllCards.drawPile.drawn.length - 1].hilighted = true
            let selectedCard = this.state.cards.drawPile.drawn[this.state.cards.drawPile.drawn.length - 1]
            selectedCard.position = "drawPile"
            this.setState({ selectedCard: selectedCard})
        }
        this.setState({cards: newAllCards})
    }

    selectCardFromInPlay(columnNumber){
        let newCards = this.state.cards
        let clickedCard = this.state.cards.inPlay[columnNumber][this.state.cards.inPlay[columnNumber].length - 1]
        //if selected card DONE
            // if clicked card is one higher than selected card AND opposite colour DONE
                //place card in that array DONE
            // else if selected card is same as clicked card
                //deselect card
            // else
                //do nothing
        // else
            //select card
        if (this.state.selectedCard) {
            if (this.state.selectedCard === this.state.cards.inPlay[columnNumber][this.state.cards.inPlay[columnNumber].length - 1]){
                this.setState({selectedCard: null})
                newCards.inPlay[columnNumber][newCards.inPlay[columnNumber].length - 1].hilighted = false
            } else if (this.state.selectedCard.value == clickedCard.value - 1 && this.state.selectedCard.colour != clickedCard.colour){
                newCards.inPlay[columnNumber].push(this.state.selectedCard)
                newCards.inPlay[columnNumber][newCards.inPlay[columnNumber].length - 1].hidden = false
                newCards.inPlay[columnNumber][newCards.inPlay[columnNumber].length - 1].hilighted = false
                if (this.state.selectedCard.position === "drawPile"){
                    newCards.drawPile.drawn.pop()
                } else if (this.state.selectedCard.position === "inPlay"){
                    newCards.inPlay[this.state.selectedCard.column].pop()
                }
                this.setState({selectedCard: null})
            }
        } else {
            newCards.inPlay[columnNumber][newCards.inPlay[columnNumber].length - 1].hilighted = true
            let selectedCard = newCards.inPlay[columnNumber][newCards.inPlay[columnNumber].length - 1]
            selectedCard.position = "inPlay"
            selectedCard.column = columnNumber
            this.setState({ selectedCard: selectedCard})
        }
        this.setState({cards: newCards})
    }

    drawCard() {
        let newCards = this.state.cards
        if (newCards.drawPile.toDraw.length === 0){
            newCards.drawPile.toDraw = newCards.drawPile.drawn
            newCards.drawPile.drawn = []
        } else {
            newCards.drawPile.drawn.push(newCards.drawPile.toDraw.pop())
        }
        this.setState({cards: newCards})
    }

    dealCards() {
        let newAllCards = this.state.allCards
        let newCards = this.state.cards

        for (let card of newAllCards){
            card["hidden"] = true
            card["hilighted"] = false
            if(card.suit === "HEARTS" || card.suit === "DIAMONDS"){
                card["colour"] = "Red"
            } else {
                card["colour"] = "Black"
            }
            if (card.value === "JACK"){
                card.value = "11"
            } else if (card.value === "QUEEN"){
                card.value = "12"
            } else if (card.value === "KING"){
                card.value = "13"
            } else if (card.value === "ACE"){
                card.value = "1"
            }
        }

        for(let i=0; i < 7; i++){
            const numOfCardsToDeal = i + 1;
            let counter = 0;
            while(counter < numOfCardsToDeal){
                newCards.inPlay[`${i}`].push(newAllCards.pop())
                counter++
            }
            newCards.inPlay[`${i}`][newCards.inPlay[`${i}`].length - 1].hidden = false
        }
        newCards.drawPile.toDraw = newAllCards
        this.setState({cards: newCards})
    }

    componentDidMount() {
        const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=52"

        fetch(url)
            .then(res => res.json())
            .then(cards => this.setState({allCards: cards.cards}))
            .catch(err => console.error)
    }

    render() {
        return (
            <div className="game-container">
                <div className="top-bar">
                    <DrawCardContainer cards={this.state.cards.drawPile} onCardClick={this.handleCardClick}></DrawCardContainer>
                    <AceCardContainer cards={this.state.cards.ace} onCardClick={this.handleCardClick}></AceCardContainer>
                </div>
                <CardPlayContainer cards={this.state.cards.inPlay} onCardClick={this.handleCardClick}></CardPlayContainer>
                <button onClick={this.dealCards}>Start Game</button>
            </div>
        )
    }
}

export default SolitaireContainer