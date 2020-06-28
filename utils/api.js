import { AsyncStorage } from "react-native";

const DECKS_KEY = "mobile-flash-cards:decks"


export function removeItems () {
    return AsyncStorage.removeItem(DECKS_KEY);
}

export function getDecks () {
    return AsyncStorage.getItem(DECKS_KEY).then((results)=>{
        if(!results){
            let data = {}
            return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
                .then(()=> data)
        }
        else{
            return JSON.parse(results)
        }

    })

}

export function deleteDeck (title) {
    return getDecks().then((decks) => {
        decks[title] = undefined;
        delete decks[title]
        return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks)).then((item) => item)
    })
}

export function getDeck (title){
    return AsyncStorage.getItem(DECKS_KEY)
        .then((results) => {
            return data[title]
        })
}

export function saveDeckTitle(title) {
    const newDeck = {
        [title]: {
            title,
            questions: []
        }
    }

    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(newDeck)).then(() => {
        return newDeck;
    });
}

export function addCardToDeck(question, answer, title) {
    const newQuestion = {
        question,
        answer
    }
    

    return getDecks().then((decks) => {
        decks && decks[title] && decks[title].questions.push(newQuestion)
        return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks)).then((item) => item)
    })

}