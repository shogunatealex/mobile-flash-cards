import { RECEIVE_DECKS, ADD_CARD, ADD_DECK, DELETE_DECK } from '../actions'

function entries (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK :
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD :
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat(action.card)
                }
            }
        case DELETE_DECK: 
            const key = action.title;
            const { [key]: value, ...newState } = state;
            console.log("-----------");
            console.log(newState);
            console.log("-----------");
            return newState
        default :
            return state
    }
}

export default entries