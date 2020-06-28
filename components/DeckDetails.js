import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { brown, purple } from '../utils/colors'
import { connect } from 'react-redux'
import { deleteDeck } from '../utils/api'
import { deleteDeck as deleteDeckAction } from '../actions'

export class DeckDetails extends Component {

    deleteDeck = () => {
        const { title } = this.props.deckInfo;
        const { navigation, dispatch } = this.props
        navigation.navigate('Home')
        deleteDeck(title).then(() => {
            dispatch(deleteDeckAction(title))

        })
    }

    render(){
        if(!this.props.deckInfo){
            return(
            <View>
                <Text>Deck Not Found!</Text>
            </View>)
        }
        const { title, questions } = this.props.deckInfo
        const { navigation } = this.props;
        return (
            <View style={styles.deckDetailsContainer}>
                <View style={styles.deck}>
                    <Text style={styles.deckDetailsTitle}>{title}</Text>
                    <Text>{questions.length} Card{questions.length === 1 ? "" : "s"}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.addCardButton} onPress={() => navigation.navigate("AddCard", { title })}>
                        <Text style={{color: "#fff",fontSize: 36}}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startQuizButton} onPress={() => navigation.navigate("Quiz", { title })}>
                        <Text style={{color: "#fff",fontSize: 36}}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteDeckButton} onPress={this.deleteDeck}>
                        <Text style={{color: brown,fontSize: 24}}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>

            </View>


          )
    }

}


const styles = StyleSheet.create({
    deckDetailsContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    deckDetailsTitle: {
        marginTop: 40,
        textAlign: "center", 
        fontSize: 36
    },
    addCardButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "90%",
        height: 75,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    startQuizButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "90%",
        height: 75,
        backgroundColor: "#000",
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    deleteDeckButton: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },
    deck: {
        margin: 5,
        padding: 20,
        alignItems: "center",
    },
    deckHeader: {
        fontSize: 36
    }
})

function mapStateToProps( decks, { navigation }){
    const { title } = navigation && navigation.state && navigation.state.params

    return {
        deckInfo: decks && decks[title] ? decks[title] : undefined
    }
}

export default connect(mapStateToProps)(DeckDetails)