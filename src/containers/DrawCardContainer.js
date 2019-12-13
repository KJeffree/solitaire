import React from 'react';
import CardPlaceholder from '../components/CardPlaceholder';

const DrawCardContainer = (props) => {
    return (
        <div className="card-container">
            <CardPlaceholder cards={props.cards.toDraw} position="drawPile" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards.drawn} position="drawn" onCardClick={props.onCardClick}></CardPlaceholder>
        </div>
    )
}

export default DrawCardContainer;