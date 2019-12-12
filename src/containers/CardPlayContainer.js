import React from 'react';
import CardPlaceholder from '../components/CardPlaceholder';

const CardPlayContainer = (props) => {
    return (
        <div className="card-container play-container">
            <CardPlaceholder cards={props.cards["0"]} position={"inPlay"}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["1"]} position={"inPlay"}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["2"]} position={"inPlay"}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["3"]} position={"inPlay"}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["4"]} position={"inPlay"}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["5"]} position={"inPlay"}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["6"]} position={"inPlay"}></CardPlaceholder>
        </div>
    )
}

export default CardPlayContainer;