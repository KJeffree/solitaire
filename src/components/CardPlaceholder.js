import React from 'react';

const CardPlaceholder = (props) => {

    console.log(props.cards)

    const cardNodes = props.cards.length > 0 ? <img src={props.cards[0].image}></img> : null

    

    return (
        <div className="card-placeholder">
            {cardNodes}
        </div>
    )
}

export default CardPlaceholder;