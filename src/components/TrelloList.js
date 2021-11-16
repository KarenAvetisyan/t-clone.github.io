import TrelloActionButton from "./TrelloActionButton";
import TrelloCard from "./TrelloCard";
import { Droppable, Draggable } from "react-beautiful-dnd"
import { connect } from 'react-redux'

const TrelloList = ({title, cards, listID, index}) => {

    // RENDERED LIST 
    const renderedList = 
        provided => (
            <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} style={styles.container}>
                <Droppable droppableId={String(listID)}>
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <h3>{title}</h3>
                            {cards.map((card, index) => (
                                <TrelloCard id={card.id} index={index} key={card.id} text={card.text} />
                            ))}
                            {provided.placeholder}
                            <TrelloActionButton listID={listID} />
                        </div>
                    )}
                </Droppable>
            </div>
        )
        

    return ( 
        <Draggable draggableId={String(listID)} index={index}>
            {renderedList}
        </Draggable>
     );
}

// QUICK STYLES 
const styles = {
    container: {
        background: "rgb(247, 247, 247)",
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.582)',
        display: 'inline-block',
        width: '100%',
        maxWidth: '300px',
        padding:' 30px 30px',
        margin: '15px 30px',
        borderRadius: '10px',
    }
}


 
export default connect()(TrelloList);