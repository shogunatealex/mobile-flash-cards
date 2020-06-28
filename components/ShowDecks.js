import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import Deck  from "./Deck";
import { white } from '../utils/colors'

class ShowDecks extends Component{

    componentDidMount(){
        const { dispatch } = this.props
        getDecks()
            .then((decks) => {
                dispatch(receiveDecks(decks))
            })
    }


    render() {
        const { deckIds, decks, navigation } = this.props;
        return (
            <ScrollView style={{backgroundColor:white}}>
                {deckIds && deckIds.length
                    ?   deckIds.map((deckId) => {
                            return (
                                <Deck key={"deck-" + decks[deckId].title} navigation={navigation} title={decks[deckId].title} questions={decks[deckId].questions}/>
                            )
                        })
                    : (<Text style={{flex: 1, textAlign: "center", alignSelf: "center", fontSize: 36, marginTop: 50}}>No Decks Yet! Get Creating!</Text>)
            }
            </ScrollView>
        )
    }
   
}



function mapStateToProps(decks){
    return {
        decks,
        deckIds: Object.keys(decks)
    }
}

export default connect(mapStateToProps)(ShowDecks);