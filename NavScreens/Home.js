import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

export default class Home extends Component {
    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button title='Go To New Trip' onPress={()=>this.props.navigation.navigate('NewTrip')}/>
            </View>
        )
    }
}