import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

import Profile from './Profile.js';
import HomeNavigation from './HomeNavigation.js';

export default class Feed extends Component {
    state = {
        authname: null
      };

    componentDidMount() {
        AsyncStorage.getItem('response.id_token', (err, result) => {
            this.setState({'authname': result})
        })
    }

    logout = () => {
        AsyncStorage.removeItem('response.id_token', (err, result) => {
            this.setState({'authname': null})
            console.log("logout button:", this.state);
        })
    }
    render() {
        // console.log(this.props.)
        return(
            <View styles={styles.container}>
                <Text>Hello from feed!</Text>
                <Button
                    icon="add-a-photo"
                    title="To Profile"
                    onPress={
                        () => this.props.navigation.navigate('Profile')
                    }
                />
                <HomeNavigation />
                <Button title="Log out with Auth0" onPress={this.logout} />
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 40,
    },
  });
