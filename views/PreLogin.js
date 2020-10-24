import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PreLogin extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    login = () => {
      Actions.Login()
    }

    signup = () => {
      Actions.Signup()
    }

    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.button} onPress = {this.login} title="Log In"/>
                <Button style={styles.button} onPress = {this.signup} title="Sign Up"/>
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
});