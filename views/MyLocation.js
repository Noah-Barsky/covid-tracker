import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Heatmap, Callout } from "react-native-maps";

export default class MyLocation extends React.Component {
	constructor() {
		super();
		this.state = {
			ready: false,
			where: { lat: null, lng: null },
			error: null,
			points: [],
			pointsLoaded: false,
		};
	}

	getPoints = () => {
		return fetch("http://10.84.105.122:3000/getPoints", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				this.setState({ points: json, pointsLoaded: true });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	createPoint = (point) => {
		return fetch("http://10.84.105.122:3000/createPoint", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				point: point,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				this.setState({ points: json });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	getData = async () => {
		try {
			const value = await AsyncStorage.getItem("@id");
			if (value !== null) {
				// value previously stored
				console.log(value);
			}
		} catch (e) {
			// error reading value
		}
	};

	componentDidMount() {
		let geoOptions = {
			enableHighAccuracy: true,
			timeOut: 20000,
			maximumAge: 60 * 60 * 24,
		};
		this.setState({ ready: false, error: null });
		navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
		this.getPoints();
	}

	geoSuccess = (position) => {
		this.setState({
			ready: true,
			where: { lat: position.coords.latitude, lng: position.coords.longitude },
		});

		console.log({ lat: position.coords.latitude, lng: position.coords.longitude });
	};

	geoFailure = (err) => {
		this.setState({ error: err.message });
	};

	render() {
		return (
			<View style={styles.container}>
				{!this.state.ready && <Text> Ready!</Text>}
				{this.state.error && <Text>{this.state.error}</Text>}
				{this.state.ready && this.state.pointsLoaded && (
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: this.state.where.lat,
							longitude: this.state.where.lng,
							latitudeDelta: 0.05,
							longitudeDelta: 0.05,
						}}
						onPress={(e) => this.createPoint(e.nativeEvent.coordinate)}
					>
						<Heatmap radius={40} points={this.state.points} />
					</MapView>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
