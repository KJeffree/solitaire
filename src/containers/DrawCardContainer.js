import React from 'react';
import CardPlaceholder from '../components/CardPlaceholder';

const DrawCardContainer = (props) => {
    return (
        <div className="card-container">
            <CardPlaceholder cards={props.cards.toDraw} position="drawPile"></CardPlaceholder>
            <CardPlaceholder cards={props.cards.drawn} positin="drawn"></CardPlaceholder>
        </div>
    )
}

export default DrawCardContainer;