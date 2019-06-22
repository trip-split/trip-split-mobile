import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import Feed from './components/Feed.js';


const RootStack = createStackNavigator({
Home: Home,
Profile: {
  screen: Profile},
Feed: Feed,
});

const App = createAppContainer(RootStack);

export default App;

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text>
//       </View>
//     );
//   }
// }

// class SettingsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     );
//   }
// }

// const TabNavigator = createBottomTabNavigator({
//   Home: { screen: HomeScreen },
//   Settings: { screen: SettingsScreen },
// });

// export default createAppContainer(TabNavigator);