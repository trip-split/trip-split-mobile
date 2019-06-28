import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import {View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider as StoreProvider} from 'react-redux';
import rootReducer from './reducers/index.js';

import axios from 'axios';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Settings from './NavScreens/Settings.js';
import Profile from './NavScreens/Profile.js';
import Home from './NavScreens/Home.js';
import WelcomeScreen from './NavScreens/WelcomeScreen.js';
import NewTrip from './NavScreens/NewTrip.js';
import Logout from './NavScreens/Logout.js';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Home',
          headerLeft: (
            <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
          )
        };
      }
    },
    NewTrip: {
      screen: NewTrip
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});
const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Settings',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  SettingsStack
}, {
  navigationOptions:({navigation})=>{
    const {routeName} = navigation.state.routes[navigation.state.index]
    return{
      header: null,
      headerTitle: routeName
    }
  }
})

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator:DashboardTabNavigator
}, {
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerLeft: (
        <Icon 
        style={{paddingLeft: 10, }} 
        name="md-menu" size={30} 
        onPress={() => navigation.openDrawer()}
        />
      )
    };
  }
})

const LogoutStackNavigator = createStackNavigator({
  Logout: {
    screen: Logout,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Logout',
      };
    }
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Settings:{
    screen: DashboardStackNavigator
  },
  Logout:{
    screen: LogoutStackNavigator
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{screen:WelcomeScreen},
  Dashboard:{screen:AppDrawerNavigator}
})

const store = createStore(rootReducer, applyMiddleware(thunk))
let AppContainer = createAppContainer(AppSwitchNavigator);


export default class App extends React.Component {
  componentDidMount() {
    axios.get('https://trip-split-deploy2.herokuapp.com/')
        .then(res => {
            console.log("app loaded")
        })
        .catch(err => console.log("This is the server up endpoint, if it doesn't work check deployment"))
  }
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </StoreProvider>
    );
  }
}