
// CONSTANTS
export const CONSTANTS = {
    ADD_LIST: "ADD_LIST",
    ADD_CARD: "ADD_CARD",
    REMOVE_LIST: "REMOVE_LIST",
    DRAG_HAPPENED: "DRAG_HAPPENED",
    REMOVE_CARD: "REMOVE_CARD"
}

// ALL LIST ACTIONS 

    //-- ADD LIST
    export const addList = (title) => {
        return {
            type: CONSTANTS.ADD_LIST,
            payload: title 
        }
    } 
    // -- ADD CARD
    export const addCard = (listID, text ) => {
        return {
            type: CONSTANTS.ADD_CARD,
            payload: { listID, text } 
        }
    } 
    //-- REMOVE LIST 
    export const removeList = (listID) => {
        return {
            type: CONSTANTS.REMOVE_LIST,
            payload: listID
        }
    }
    //-- REMOVE CARD
    export const removeCard = ( cardID ) => {
        return {
            type: CONSTANTS.REMOVE_CARD,
            payload: cardID 
        }
    }
    //-- DragDropContext SORTS 
    export const sort = (
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type
    ) => {
        return {
            type: CONSTANTS.DRAG_HAPPENED,
            payload: {  droppableIdStart,
                        droppableIdEnd,
                        droppableIndexStart,
                        droppableIndexEnd,
                        draggableId ,
                        type }
        }
    }

// END OF LIST ACTIONS 