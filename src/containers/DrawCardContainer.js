import React from 'react';
import CardPlaceholder from '../components/CardPlaceholder';

const DrawCardContainer = (props) => {
    return (
        <div className="card-container">
            <CardPlaceholder cards={props.cards.toDraw}></CardPlaceholder>
            <CardPlaceholder cards={props.cards.drawn}></CardPlaceholder>
        </div>
    )
}

export default DrawCardContainer;