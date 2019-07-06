import React, {Component} from 'react';
import { Text, ScrollView, View, Button } from 'react-native';
import { connect } from 'react-redux';


class Home extends Component {
    render() {
        console.log(this.props.user)
        console.log(this.props.user_id)
        return(
            <ScrollView scrollEventThrottle={16}>
                <Button title='Go To New Trip' onPress={()=>this.props.navigation.navigate('NewTrip')}/>
                {/* <View>

                </View> */}
                <Text>{this.props.user_id} Working?</Text>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({
    authReducer: {user_id}
  }) => ({
    user_id
  })

export default connect(mapStateToProps)(Home);