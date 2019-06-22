import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Profile from './Profile.js';

export default class Feed extends Component {
    render() {
        // console.log(this.props.)
        return(
            <View style={styles.container}>
                <Text>Hello from feed!</Text>
                <Button
                    title="To Profile"
                    onPress={
                        () => this.props.navigation.navigate('Profile')
                    }
                />
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
    // title: {
    //   fontSize: 20,
    //   textAlign: 'center',
    //   marginTop: 40,
    // },
  });