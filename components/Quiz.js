import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import { purple, red, brown } from '../utils/colors'

class Quiz extends Component{


    state = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        questionsAnswered: 0,
        showAnswer: false,
    }

    componentDidMount(){
    }

    isCorrect = () => {
        this.setState({
            correctAnswers: this.state.correctAnswers + 1,
            questionsAnswered: this.state.questionsAnswered + 1
        })
    }

    isIncorrect = () => {
        this.setState({
            incorrectAnswers: this.state.CorrectAnswers + 1,
            questionsAnswered: this.state.questionsAnswered + 1
        })
    }

    toggleAnswer = () => {
        this.setState({
            showAnswer: !this.state.showAnswer,
        })
    }

    resetQuiz = () => {
        this.setState({
            correctAnswers: 0,
            incorrectAnswers: 0,
            questionsAnswered: 0,
            showAnswer: false,
        })
    }

    render() {
        const { showAnswer, questionsAnswered, correctAnswers, incorrectAnswers } =  this.state;
        const { questions, navigation } = this.props
        const currentQuestion = questions[questionsAnswered];
        if(questionsAnswered === questions.length){
            clearLocalNotification()
            .then(setLocalNotification);
            return (
                <View style={styles.quizContainer}>
                    <View style={styles.deck}>
                        <Text style={styles.addDeckTitle}>You answered {correctAnswers} out of {questionsAnswered} correctly! </Text>
                    </View>
                    <View>
                        <View style={styles.quizStatus} onPress={this.deleteDeck}>
                            <Text style={{color: brown,fontSize: 24}}>Great Job!</Text>
                        </View>
                        <TouchableOpacity style={styles.addCardButton} onPress={this.resetQuiz}>
                            <Text style={{color: "#fff",fontSize: 36}}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.startQuizButton} onPress={() => navigation.goBack()}>
                            <Text style={{color: "#fff",fontSize: 36}}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
        return (
            <View style={styles.quizContainer}>
                <View style={styles.deck}>
                    <Text style={styles.addDeckTitle}>
                        {showAnswer 
                            ? currentQuestion.answer
                            : currentQuestion.question}
                    </Text>
                    <TouchableOpacity onPress={this.toggleAnswer}>
                        <Text style={{color: red, fontSize: 18}}>{showAnswer ? "Question" : "Answer" }</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <View style={styles.quizStatus} onPress={this.deleteDeck}>
                        <Text style={{color: brown,fontSize: 24}}>{questions.length - questionsAnswered} Questions Remaining</Text>
                    </View>
                    <TouchableOpacity style={styles.addCardButton} onPress={this.isCorrect}>
                        <Text style={{color: "#fff",fontSize: 36}}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startQuizButton} onPress={this.isIncorrect}>
                        <Text style={{color: "#fff",fontSize: 36}}>Incorrect</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
   
}

const styles = StyleSheet.create({
    quizContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    addDeckTitle: {
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
    quizStatus: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },
    deck: {
        margin: 5,
        padding: 20,
        alignItems: "center",
    },
})


// code pulled from https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php#:~:text=Write%20a%20JavaScript%20program%20to%20shuffle%20an%20array.&text=ES6%20Version%3A,a%20random%20index%20index%20%3D%20Math.
// quick shuffle algorithm to get random questions
function shuffle(arra1) {
    let ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function mapStateToProps(decks, { navigation }){
    const { title } = navigation && navigation.state && navigation.state.params
    return {
        questions: title && decks[title] ? shuffle(decks[title].questions) : [],
    }
}

export default connect(mapStateToProps)(Quiz);