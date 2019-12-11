import React from 'react';

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
                    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [],
                },
                ace: {
                    "HEARTS": [], "DIAMONDS": [], "SPADES": [], "CLUBS": []
                }
            }

        }
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
            <div>{this.state.allCards.length > 0 ? <img src={this.state.allCards[0].image}></img> : null}</div>
        )
    }
}

export default SolitaireContainer