import React, { Fragment } from 'react';
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
        this.moveCards = this.moveCards.bind(this)
        this.selectCard = this.selectCard.bind(this)
        this.fetchCards = this.fetchCards.bind(this)
        this.resetState = this.resetState.bind(this)
    }

    handleCardClick(position, columnName = null, index = null) {
        if (position === "drawPile"){
            this.drawCard()  
        } else if (position === "drawn"){
            this.selectCardFromDrawPile()
        } else if (position === "inPlay"){
            this.selectCardFromInPlay(columnName, index)
        } else {
            this.selectCardFromAcePile(columnName)
        }
    }

    selectCardFromAcePile(name){
        let newCards = this.state.cards
        const clickedCard = newCards.ace[name][newCards.ace[name].length - 1]
        if (clickedCard === this.state.selectedCard){
            this.setState({selectedCard: null})
            newCards.ace[name][newCards.ace[name].length - 1].hilighted = false
        } else if (this.state.selectedCard === null && newCards.ace[name].length === 0){
            return
        } else {
            if (this.state.selectedCard && name === this.state.selectedCard.suit && this.state.selectedCard.value === "1" && newCards.ace[name].length === 0){
                this.moveCards(name, "ace")
                this.setState({selectedCard: null})
            } else if (this.state.selectedCard && name === this.state.selectedCard.suit && parseInt(newCards.ace[name][newCards.ace[name].length - 1].value) + 1 == this.state.selectedCard.value){
                this.moveCards(name, "ace")
            } else {
                this.selectCard("ace", name, newCards.ace[name].length - 1)
            }
            
        }
        this.setState({cards: newCards})

    }

    selectCardFromDrawPile(){
        let newCards = this.state.cards
        const clickedCard = newCards.drawPile.drawn[newCards.drawPile.drawn.length - 1]
        if (clickedCard === this.state.selectedCard){
            newCards.drawPile.drawn[newCards.drawPile.drawn.length - 1].hilighted = false
            if (newCards.ace[this.state.selectedCard.suit].length > 0){
                if (newCards.ace[this.state.selectedCard.suit][newCards.ace[this.state.selectedCard.suit].length - 1].value == this.state.selectedCard.value - 1){
                    this.moveCards(this.state.selectedCard.suit, "ace")
                }
            } else if (this.state.selectedCard.value === "1") {
                newCards.drawPile.drawn[newCards.drawPile.drawn.length - 1].hilighted = false
                this.moveCards(this.state.selectedCard.suit, "ace")
            }

            this.setState({selectCard: null})

        } else if (this.state.selectedCard === null && newCards.drawPile.drawn.length === 0){
            return
        } else {
            this.selectCard("drawPile", "drawn", newCards.drawPile.drawn.length - 1)
        }
        this.setState({cards: newCards})
    }

    selectCardFromInPlay(columnName, index){
        let newCards = this.state.cards
        let clickedCard = this.state.cards.inPlay[columnName][index]
        if (this.state.selectedCard && this.state.selectedCard.column === columnName && this.state.selectedCard != clickedCard){
            return
        }
        if (this.state.selectedCard === null && newCards.inPlay[columnName].length === 0){
            return
        } else if (!this.state.selectedCard && newCards.inPlay[columnName][index].hidden && newCards.inPlay[columnName].length - 1 === index){
            newCards.inPlay[columnName][index].hidden = false
        } else if (!this.state.selectedCard && newCards.inPlay[columnName][index].hidden){
            return
        } else if (this.state.selectedCard && this.state.selectedCard.hidden === false) {

            if (newCards.inPlay[columnName].length === 0 && this.state.selectedCard.value === "13"){

                this.moveCards(columnName, "inPlay")
            } else if (newCards.inPlay[columnName].length === 0){

                return
            }
            else if (this.state.selectedCard === newCards.inPlay[columnName][index]){
                newCards.inPlay[columnName][index].hilighted = false
                if (newCards.ace[this.state.selectedCard.suit].length > 0){
                    if (newCards.ace[this.state.selectedCard.suit][newCards.ace[this.state.selectedCard.suit].length - 1].value == this.state.selectedCard.value - 1){
                    this.moveCards(this.state.selectedCard.suit, "ace")
                    }
                } else if (this.state.selectedCard.value === "1") {
                    newCards.inPlay[columnName][index].hilighted = false
                    this.moveCards(this.state.selectedCard.suit, "ace")
                }
                this.setState({selectedCard: null})
            } else if (this.state.selectedCard.value == clickedCard.value - 1 && this.state.selectedCard.colour != clickedCard.colour){

                this.moveCards(columnName, "inPlay")
            } else {
                this.selectCard("inPlay", columnName, index)
            } 
        } else {
            this.selectCard("inPlay", columnName, index)
        } 
        this.setState({cards: newCards})
    }

    selectCard(position, column, index){
        let newCards = this.state.cards
        if (this.state.selectedCard) {
            newCards[this.state.selectedCard.position][this.state.selectedCard.column][this.state.selectedCard.index].hilighted = false
        }
        if (newCards[position][column][index]){
            newCards[position][column][index].hilighted = true
            let selectedCard = newCards[position][column][index]
            selectedCard.position = position
            selectedCard.column = column
            selectedCard.index = index
            this.setState({ selectedCard: selectedCard})

        } else {
            this.setState({selectedCard: null})
        }
        
    }

    moveCards(columnName, position){
        let newCards = this.state.cards
        let oldPosition = this.state.selectedCard.position
        let oldColumn = this.state.selectedCard.column
        
        if (this.state.selectedCard.position === "inPlay"){
            for(let i = this.state.selectedCard.index; i < newCards.inPlay[this.state.selectedCard.column].length; i++){
                newCards[position][columnName].push(newCards.inPlay[oldColumn][i])
            }
            let difference = newCards.inPlay[oldColumn].length - this.state.selectedCard.index
            newCards.inPlay[oldColumn].splice(this.state.selectedCard.index, difference)
        } else {
            newCards[position][columnName].push(this.state.selectedCard)
            newCards[oldPosition][oldColumn].pop()
        }
        newCards[position][columnName].forEach(card => {
            card.hilighted = false
        })
        this.setState({selectedCard: null})
    }

    shuffleCards(){
        let newCards = this.state.allCards
        for (let i = newCards.length - 1; i > 0; i--){
            let previousCard = Math.floor(Math.random() * (i + 1));
            [newCards[i], newCards[previousCard]] = [newCards[previousCard], newCards[i]]
        }
        this.setState({allCards: newCards})
    }

    drawCard() {
        let newCards = this.state.cards
        if (newCards.drawPile.toDraw.length === 0){
            newCards.drawPile.toDraw = newCards.drawPile.drawn.reverse()
            newCards.drawPile.drawn = []
        } else {
            newCards.drawPile.drawn.push(newCards.drawPile.toDraw.pop())
            newCards.drawPile.drawn[newCards.drawPile.drawn.length - 1].hidden = false
            if (this.state.selectedCard){
                newCards[this.state.selectedCard.position][this.state.selectedCard.column][this.state.selectedCard.index].hilighted = false
                this.setState({selectedCard: null})
            }
        }
        this.setState({cards: newCards})
    }

    dealCards() {
        this.shuffleCards();
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

    // componentDidMount() {
    //     const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=52"

    //     fetch(url)
    //         .then(res => res.json())
    //         .then(cards => this.setState({allCards: cards.cards}))
    //         .catch(err => console.error)
    // }

    fetchCards(){
        this.resetState()
        const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=52"

        fetch(url)
            .then(res => res.json())
            .then(cards => this.setState({allCards: cards.cards}))
            .then(result => {
                this.dealCards()
            })
            .catch(err => console.error)
    }

    resetState(){
        this.setState({
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
        })
    }

    render() {
        return (
            <div className="main-container">
            <div className="game-container">
                <div className="top-bar">
                    <DrawCardContainer cards={this.state.cards.drawPile} onCardClick={this.handleCardClick}></DrawCardContainer>
                    <AceCardContainer cards={this.state.cards.ace} onCardClick={this.handleCardClick}></AceCardContainer>
                </div>
                <CardPlayContainer cards={this.state.cards.inPlay} onCardClick={this.handleCardClick}></CardPlayContainer>
            </div>
            <button id="start-button" onClick={this.fetchCards}>Start New Game</button>
            </div>
        )
    }
}

export default SolitaireContainer