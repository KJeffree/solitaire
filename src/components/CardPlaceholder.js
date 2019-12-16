import React from 'react';

const CardPlaceholder = (props) => {
    let cardNodes = null;

    function handleClick(index) {
        if (props.column){
            props.onCardClick(props.position, props.column, index)
        } else {
            props.onCardClick(props.position)
        }
    } 
    
    if (props.cards.length === 0){
        return (
            <div className="card-placeholder" onClick={handleClick}>
            </div>
        )
    }
    if (props.position === "inPlay") {
        cardNodes = props.cards.map((card, index) => {
            if (card.hidden === true) {
                return <img src="cardback.png" key={index} index={index} className={`shown${index} ${card.hilighted ? "hilighted" : null}`} alt={`${card.value} ${card.suit}`} onClick={() => handleClick(index)}></img>
            } else {
                return <img 
                            src={card.image} 
                            index={index}
                            key={index} 
                            className={`shown${index} ${card.hilighted ? "hilighted" : null}`} 
                            alt={`${card.value} ${card.suit}`} 
                            onClick={() => handleClick(index)}></img>

            }
        })
    } else if (props.position === "ace" || props.position === "drawn"){
        cardNodes = <img 
                        src={props.cards[props.cards.length - 1].image} 
                        index={props.cards[props.cards.length - 1]}
                        className={`${props.cards[props.cards.length - 1].hilighted ? "hilighted" : null}`} 
                        alt={`${props.cards[props.cards.length - 1].value} ${props.cards[props.cards.length - 1].suit}`} 
                        onClick={handleClick}> 
                    </img>
    }
    else {
        cardNodes = <img src="cardback.png" index={props.cards[props.cards.length - 1]} className={`${props.cards[props.cards.length - 1].hilighted ? "hilighted" : null}`} alt={`${props.cards[props.cards.length - 1].value}  ${props.cards[props.cards.length - 1].suit}`} onClick={handleClick} ></img>
    }
    

    return (
        <div className="card-placeholder" >
            {cardNodes}
        </div>
    )
}

export default CardPlaceholder;