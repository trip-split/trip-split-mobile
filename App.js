import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import Feed from './components/Feed.js';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index.js';


const RootStack = createStackNavigator({
Home: Home,
Profile: {
  screen: Profile},
Feed: Feed,
});

const store = createStore(rootReducer, applyMiddleware(thunk))

let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}