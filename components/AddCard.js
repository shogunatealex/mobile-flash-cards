import React,  {Component} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { brown, offWhite, purple, white } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCardToDeck as addCardToDeckAction} from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component{

    state = {
        question: "",
        answer: ""
    }


    onChangeQuestionText = (question) => {
        this.setState({
            question
        })
    }

    onChangeAnswerText = (answer) => {
        this.setState({
            answer
        })
    }

    onPress = () => {
        const { dispatch, navigation } = this.props;
        const { title } = this.props.navigation.state.params;
        const { question, answer } = this.state;

        const saveValue = {
            question,
            answer
        }
        addCardToDeck(question, answer, title)
            .then(() => {
                dispatch(addCardToDeckAction(saveValue, title))
                this.setState({
                    question: "",
                    answer: ""
                })
                navigation.goBack();

            })
    }

    render() {
        const { question, answer } = this.state;
        return (
            <View style={{flex: 1,justifyContent: "space-between", backgroundColor:white}}>
                <View>
                    <Text style={styles.addDeckTitle}>What is your new question?</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Question..."
                        onChangeText={question => this.onChangeQuestionText(question)}
                        value={question}/>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Answer..."
                        onChangeText={question => this.onChangeAnswerText(question)}
                        value={answer}/>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.onPress}>
                        <Text style={{color: "#fff",fontSize: 36}}>Add Card</Text>
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



export default connect()(AddCard);