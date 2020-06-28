import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import ShowDecks from './components/ShowDecks';
import AddDecks from './components/AddDecks';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { purple, white } from './utils/colors';
import Constants from 'expo-constants';
import DeckDetails from './components/DeckDetails';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

const Tabs = (createBottomTabNavigator({
  ShowDecks: {
    screen: ShowDecks,
    navigationOptions: {
      tabBarLabel: 'Show Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  AddDecks: {
    screen: AddDecks,
    navigationOptions: {
      tabBarLabel: 'Add Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={30} color={tintColor} />
    },
  }
},
{
  navigationOptions: {
    headerShown: false
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}));
const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions:{
      headerShown: false
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerShown: true,
      headerTintColor: white,
      headerTitle: "Deck Details",
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerShown: true,
      headerTintColor: white,
      headerTitle: "Add Card",
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerShown: true,
      headerTintColor: white,
      headerTitle: "Quiz",
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
}))


export default class App extends React.Component {


  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
            <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }}>
              <StatusBar translucent backgroundColor={purple}/>
            </View>
          <MainNavigator style={{backgroundColor:white}}/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
