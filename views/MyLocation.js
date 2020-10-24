import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MyLocation extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            where: {lat:null, lng:null},
            error: null
        }
    }

    componentDidMount() {
        let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 60*60*24
        }
        this.setState({ready:false, error:null})
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions)
    }

    geoSuccess = (position) => {
        this.setState({
            ready:true,
            where:{lat:position.coords.latitude, lng:position.coords.longitude}
        })
    }
    
    geoFailure = (err) => {
        this.setState({error: err.message})
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.ready && (
                    <Text> Ready!</Text>
                )}
                {this.state.error && (
                    <Text>{this.state.error}</Text>
                )}
                {this.state.ready && (
                    <Text>{
                        `Lattitude: ${this.state.where.lat}
                        Longitude: ${this.state.where.lng}`
                    }</Text>
                )}
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