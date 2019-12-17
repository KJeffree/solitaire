import React from 'react';
import CardPlaceholder from '../components/CardPlaceholder';

const AceCardContainer = (props) => {
    return (
        <div className="card-container">
            <CardPlaceholder cards={props.cards["HEARTS"]} position="ace" column="HEARTS" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["DIAMONDS"]} position="ace" column="DIAMONDS" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["SPADES"]} position="ace" column="SPADES" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["CLUBS"]} position="ace" column="CLUBS" onCardClick={props.onCardClick}></CardPlaceholder>
        </div>
    )
}

export default AceCardContainer;