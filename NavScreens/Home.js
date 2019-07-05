import React, {Component} from 'react';
import { Text, ScrollView, View, Button } from 'react-native';

export default class Home extends Component {
    render() {
        return(
            <ScrollView scrollEventThrottle={16}>
                <Button title='Go To New Trip' onPress={()=>this.props.navigation.navigate('NewTrip')}/>
                {/* <View>

                </View> */}
            </ScrollView>
        )
    }
}