export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';

export function receiveDecks (decks) {
    return {
      type: RECEIVE_DECKS,
      decks,
    }
}
  
export function deleteDeck (title) {
    return {
        type: DELETE_DECK,
        title
    }
}
export function addCardToDeck (card, title) {
    return {
        type: ADD_CARD,
        card,
        title
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}