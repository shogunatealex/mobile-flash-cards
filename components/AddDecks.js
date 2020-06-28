import React,  {Component} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { brown, offWhite, purple, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class AddDecks extends Component{

    state = {
        text: ""
    }


    onChangeText = (text) => {
        this.setState({
            text
        })
    }

    onPress = () => {
        const { dispatch, navigation } = this.props;
        saveDeckTitle(this.state.text)
            .then((newDeck) => {
                dispatch(addDeck(newDeck))
                navigation.navigate('DeckDetails', {title: this.state.text})
                this.setState({
                    text: ""
                })
            })
    }

    render() {
        const { text } = this.state;
        return (
            <View style={{flex: 1,justifyContent: "space-between", backgroundColor:white}}>
                <View>
                    <Text style={styles.addDeckTitle}>What is the title of your new Deck?</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Deck Name..."
                        onChangeText={text => this.onChangeText(text)}
                        value={text}/>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.onPress}>
                        <Text style={{color: "#fff",fontSize: 36}}>Add Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
          )
    }
}

const styles = StyleSheet.create({
  addDeckTitle: {
    marginTop: 40,
    textAlign: "center", 
    fontSize: 36
  },
  textInput: {
      height: 50,
      padding: 10,
      borderColor: brown,
      borderWidth: 1,
      margin: 20,
      backgroundColor: offWhite,
      fontSize: 24
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "90%",
    height: 75,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  }
})



export default connect()(AddDecks);