import React from 'react'
import { Text, StyleSheet, View} from 'react-native'
import { offWhite } from '../utils/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Deck ({title, questions, navigation}) {
  return (
    <TouchableOpacity  onPress={() => navigation.navigate("DeckDetails", { title })} style={styles.deck}>
        <Text style={styles.deckHeader}>{title}</Text>
        <Text>{questions.length} Card{questions.length === 1 ? "" : "s"}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    deck: {
        margin: 5,
        padding: 20,
        backgroundColor: offWhite,
        alignItems: "center",
    },
    deckHeader: {
        fontSize: 36
    }
})