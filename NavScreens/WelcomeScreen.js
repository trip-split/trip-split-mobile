import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import DashboardScreen from './DashboardScreen.js';
import Home from './Home.js';

const auth0ClientId = 'mvhaur04VjsVeHWrmNTyEtMxzbx5ATWj';
const auth0Domain = 'https://tripsplit.auth0.com';


// Converts an object to a query string
function toQueryString(params) {
    return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

export default class WelcomeScreen extends Component {
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
        console.log("jwt token:", decoded.sub, decoded.nickname, decoded.name, decoded.picture)
        const { name } = decoded;
        AsyncStorage.setItem('response.id_token', decoded.sub, () => {
            this.setState({'authname': decoded.sub})
        });
        const data = {
            authname: decoded.sub,
            username: decoded.nickname,
            thumbnail: decoded.picture
        }
        axios.post('https://trip-split-deploy2.herokuapp.com/api/users/new-user', data)
            .then(res => {
                console.log("Login Successful");
            })
            .catch(err => console.log("User already exists, jwt added to state"));
      };

    componentDidMount() {
        AsyncStorage.getItem('response.id_token', (err, result) => {
            this.setState({'authname': result})
        })
    }


    render() {
        console.log(this.state)
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {
                this.state.authname ? (
                    <>
                    <Text>Welcome Back!</Text>
                    <Button title="Contine to Main Menu" onPress={() => this.props.navigation.navigate('Dashboard')} />
                    </>    
                ) : (
                    <Button title="Login" onPress={this.login} />
                )
              }
            </View>
        )
    }
}