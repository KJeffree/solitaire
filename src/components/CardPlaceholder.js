import React from 'react';

const CardPlaceholder = (props) => {
    let cardNodes = null;

    function handleClick(event) {
        
    } 
    // const cardNodes = !props.cards ? null : <img src={props.cards[0].image}></img>
    if (props.cards == 0){
        return (
            <div className="card-placeholder">
            </div>
        )
    }
    if (props.position === "inPlay" && props.cards.length > 0) {
        cardNodes = props.cards.map((card, index) => {
            return <img src={card.image} key={index} className={`shown${index}`} alt={`${card.value} ${card.suit}`}></img>
        })
    } else {
        cardNodes = <img src={props.cards[0].image} alt={`${props.cards[0].value} ${props.cards[0].suit}`} onClick={handleClick}></img>
    }
    

    return (
        <div className="card-placeholder">
            {cardNodes}
        </div>
    )
}

export default CardPlaceholder;