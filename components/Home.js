import React from 'react';
import { StyleSheet, Text, View, Button, Alert, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

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

export default class App extends React.Component {
  state = {
    token: null
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
    console.log("jwt token:", decoded, decoded.nickname, decoded.name, decoded.picture)
    const { name } = decoded;
    AsyncStorage.setItem('response.id_token', JSON.stringify(response.id_token), () => {
        this.setState({'token': response.id_token})
    });
    const data = {
        username: decoded.sub,
        thumbnail: decoded.picture
    }
    axios.post('https://trip-split-deploy2.herokuapp.com/api/users/new-user', data)
        .then(res => {
            console.log("Login Successful:", res);
        })
        .catch(err => console.log("Login Unsuccessful:", err));
  };

componentDidMount() {
    AsyncStorage.getItem('response.id_token', (err, result) => {
        this.setState({'token': result})
    })
    axios.get('https://trip-split-deploy2.herokuapp.com/')
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log("This is the server up endpoint, if it doesn't work check deployment"))
}

logout = () => {
    AsyncStorage.removeItem('response.id_token', (err, result) => {
        this.setState({'token': null})
    })
}


  render() {
    return (
      <View style={styles.container}>
        {
          this.state.token ? (
              <>
              <Feed navigation = {this.props.navigation}/> 
              <Button title="Log out with Auth0" onPress={this.logout} />
              </>
          ) : (
              <>
              <Button title="Log in with Auth0" onPress={this.login} />
              {/* <Button title="Log out with Auth0" onPress={this.logout} /> */}
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