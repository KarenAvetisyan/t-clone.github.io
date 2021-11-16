import './App.css';
import TrelloList from './components/TrelloList';
import { connect } from 'react-redux'
import TrelloActionButton from './components/TrelloActionButton';
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { sort } from './actions';
import styled from "styled-components"
import { removeList } from './actions';
import React from 'react';

function App({lists, dispatch}) {

  // ON DRAG END 
  const onDragEnd = result => {

    const { destination, source, draggableId, type } = result;
    if(!destination) {
      return;
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );

  };

  // REMOVE LIST 
  const handleRemoveList = (id) => {
    dispatch(removeList(id))
 }

  // RENDERED DROPPABLE  
  const renderedListContainer = 
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
                  <ListContainer {...provided.droppableProps} ref={provided.innerRef} >
                    { lists.map((list, index) => (
                          <React.Fragment key={list.id}>
                            <TrelloList listID={list.id} index={index} title={list.title}  cards={list.cards} />
                            <button style={styles.close_button} onClick={() => handleRemoveList(list.id)}>x</button>
                          </React.Fragment>
                    ))}
                    <TrelloActionButton list />
                  </ListContainer>
            )}
        </Droppable>

  return (
        <DragDropContext onDragEnd={onDragEnd}>
           {renderedListContainer}
        </DragDropContext>
  );
}

// QUICK STYLES 
const ListContainer = styled.div `
    width: 100%;
    display: flex;
`
const styles = {
  close_button: {
    width: '30px',
    height: '30px',
    borderRadius: '100%',
    color: '#000',
    flexShrink: '0',
    lineHeight: '0',
    position: 'relative',
    left: '-70px',
    top: '30px',
    cursor: 'pointer',
    fontSize: '20px'
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps) (App);
