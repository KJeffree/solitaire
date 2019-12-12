import React from 'react';
import CardPlaceholder from '../components/CardPlaceholder';

const AceCardContainer = (props) => {
    return (
        <div className="card-container">
            <CardPlaceholder cards={props.cards["HEARTS"]} position="ace"></CardPlaceholder>
            <CardPlaceholder cards={props.cards["DIAMONDS"]} position="ace"></CardPlaceholder>
            <CardPlaceholder cards={props.cards["SPADES"]} position="ace"></CardPlaceholder>
            <CardPlaceholder cards={props.cards["CLUBS"]} position="ace"></CardPlaceholder>
        </div>
    )
}

export default AceCardContainer;