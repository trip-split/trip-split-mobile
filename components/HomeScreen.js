import React from 'react';
import { StyleSheet, Text, View, Button, Alert, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import {addNewUser} from '../actions/index.js';

import Feed from './Feed.js';

/*
  You need to swap out the Auth0 client id and domain with
  the one from your Auth0 client.
  In your Auth0 client, you need to also add a url to your authorized redirect urls.
  For this application, I added https://auth.expo.io/@arielweinberger/auth0-example because I am
  signed in as the "community" account on Expo and the slug for this app is "auth0-example" (check out app.json).

  You can open this app in the Expo client and check your logs to find out your redirect URL.
*/
const auth0ClientId = 'mvhaur04VjsVeHWrmNTyEtMxzbx5ATWj';
const auth0Domain = 'https://tripsplit.auth0.com';

/**
 * Converts an object to a query string.
 */

function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

class HomeScreen extends React.Component {
  state = {
    authname: null
  };

  login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);
    
    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: 'id_token', // id_token will return a JWT token
      scope: 'openid profile', // retrieve the user's profile
      nonce: 'nonce', // ideally, this will be a random value
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    
    if (response.type === 'success') {
        this.handleResponse(response.params);
    }
};

handleResponse = (response) => {
    if (response.error) {
        Alert('Authentication error', response.error_description || 'something went wrong');
        return;
    }
    
    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);
    AsyncStorage.setItem('response.id_token', decoded.sub, () => {
        this.setState({'authname': decoded.sub})
    });
    const data = {
        authname: decoded.sub,
        username: decoded.nickname,
        thumbnail: decoded.picture
    }
    this.props.addNewUser({data})
    // axios.post('https://trip-split-deploy2.herokuapp.com/api/users/new-user', data)
    //     .then(res => {
    //         console.log("Login Successful");
    //     })
    //     .catch(err => console.log("User already exists, jwt added to state"));

  };

componentDidMount() {
    AsyncStorage.getItem('response.id_token', (err, result) => {
        this.setState({'authname': result})
    })
}




  render() {
      console.log(this.state)
    return (
      <View style={styles.container}>
        {
          this.state.authname ? (
              <>
              <Feed navigation = {this.props.navigation}/> 
              
              </>
          ) : (
              <>
              <Button title="Log in with Auth0" onPress={this.login} />
              </>
          )
        }
        {/* <Feed navigation = {this.props.navigation}/> */}
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

const mapStateToProps = state => {
    return{
      isFetchingUser: state.isFetchingUser, 
    }
  }

export default connect(mapStateToProps, {addNewUser})(HomeScreen);
// export default HomeScreen;