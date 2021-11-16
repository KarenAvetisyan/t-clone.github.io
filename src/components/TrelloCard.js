import styled from "styled-components"
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { removeCard } from "../actions";

const TrelloCard = ({text, id, index, dispatch}) => {
    
    // REMOVE CARD 
    const handleRemoveCard = (id) => {
        dispatch(removeCard(id))
    }

    // RENDERED CARD 
    const renderedCard =
        provided => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <Card className="single-trello-card">
                    <p>{text}</p>
                    <button onClick={() => handleRemoveCard(id)}>remove card</button>
                </Card>
            </div>
        )

    return ( 
       <Draggable draggableId={String(id)} index={index}>
            {renderedCard}
       </Draggable>
     );
}

// QUICK STYLES 
const Card = styled.div `
    display: inline-block;
    width: 100%;
    background-color: #fff;
    padding: 15px 15px;
    margin: 5px 0;
    font-family: 'Courier New', Courier, monospace;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.582);
`

export default connect()(TrelloCard);