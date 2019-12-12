import React from 'react';
import CardPlaceholder from '../components/CardPlaceholder';
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
            }

        }
        this.dealCards = this.dealCards.bind(this)
    }

    dealCards() {
        let newAllCards = this.state.allCards
        let newCards = this.state.cards

        for(let i=0; i < 7; i++){
            const numOfCardsToDeal = i + 1;
            let counter = 0;
            while(counter < numOfCardsToDeal){
                newCards.inPlay[`${i}`].push(newAllCards.pop())
                counter++
            }
        }
        newCards.drawPile.toDraw = newAllCards
        this.setState({cards: newCards})
    }

    componentDidMount() {
        const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=52"
        let allCards = []

        fetch(url)
            .then(res => res.json())
            .then(cards => this.setState({allCards: cards.cards}))
            .catch(err => console.error)
    }

    render() {
        return (
            <div className="game-container">
                {/* {this.state.allCards.length > 0 ? <img src={this.state.allCards[0].image}></img> : null} */}
                <div className="top-bar">
                    <DrawCardContainer cards={this.state.cards.drawPile}></DrawCardContainer>
                    <AceCardContainer cards={this.state.cards.ace}></AceCardContainer>
                </div>
                <CardPlayContainer cards={this.state.cards.inPlay}></CardPlayContainer>
                <button onClick={this.dealCards}>Start Game</button>
            </div>
        )
    }
}

export default SolitaireContainer