import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 6;

const initState = [
    {
        title: "Lesson 1",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "This is text for lesson's one card",
            },
            {
                id: `card-${1}`,
                text: "Hello everyone",
            },
        ]
    },
    {
        title: "Chapter 2",
        id:`list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: 'new text',
            },
            {
                id: `card-${3}`,
                text: 'another one',
            },
            {
                id: `card-${4}`,
                text: 'jeremy',
            },
            {
                id: `card-${5}`,
                text: 'HELLOO!!',
            },
        ]
    }
]

const listsReducer = (state = initState, action) => {
    switch(action.type) {

        // ADD LIST 
        case CONSTANTS.ADD_LIST: {
            
        console.log(action)
        const newList = {
            title: action.payload,
            cards: [],
            id: `list-${listID}`
        };
        listID += 1;
        return [...state, newList];
        }

        // ADD CARD 
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1;
           
            const newState = 
                state.map(list => {
                   if(list.id === action.payload.listID) {
                       return {
                           ...list,
                           cards: [...list.cards, newCard]
                       }
                   }
                   else return list;
                })
                return newState;
        }

        // REMOVE LIST 
        case CONSTANTS.REMOVE_LIST: {
            const newState = state.filter(list => list.id !== action.payload)
            return newState;
        }

        // REMOVE CARD
        case CONSTANTS.REMOVE_CARD: {
            const newState = state.map((list) =>  {
                list.cards = list.cards.filter( s => s.id !== action.payload )
                return list;
                });
            return newState;
        }

        // DRAG HAPPENED 
        case CONSTANTS.DRAG_HAPPENED: {
            const { droppableIdStart,
                    droppableIdEnd,
                    droppableIndexStart,
                    droppableIndexEnd,
                    // draggableId,
                    type } = action.payload;

            const newState = [...state];

            // DRAGGING LISTS AROUND 
            if(type === "list") {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            // IN THE SAME LIST
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            // OTHER LIST 
            if(droppableIdStart !== droppableIdEnd) {
                // find the list where drag happened 
                const listStart = state.find(list => droppableIdStart === list.id);

                // pull out the card from this list 
                const card = listStart.cards.splice(droppableIndexStart, 1);

                // find the list where drag ended 
                const listEnd = state.find(list => droppableIdEnd === list.id);

                // put the card in the new list 
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)

            }

            return newState;
        }

        // DEFAULT 
        default: {
            return state;
        }

    }
}


export default listsReducer;