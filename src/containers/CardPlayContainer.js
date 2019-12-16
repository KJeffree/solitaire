import React from 'react';
import CardPlaceholder from '../components/CardPlaceholder';

const CardPlayContainer = (props) => {
    return (
        <div className="card-container play-container">
            <CardPlaceholder cards={props.cards["0"]} position={"inPlay"} column="0" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["1"]} position={"inPlay"} column="1" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["2"]} position={"inPlay"} column="2" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["3"]} position={"inPlay"} column="3" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["4"]} position={"inPlay"} column="4" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["5"]} position={"inPlay"} column="5" onCardClick={props.onCardClick}></CardPlaceholder>
            <CardPlaceholder cards={props.cards["6"]} position={"inPlay"} column="6" onCardClick={props.onCardClick}></CardPlaceholder>
        </div>
    )
}

export default CardPlayContainer;