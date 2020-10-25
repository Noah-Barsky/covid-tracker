import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
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
			status: null,
			id: null,
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

	getStatus = () => {
		return fetch("http://10.84.105.122:3000/getStatus", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: this.state.id,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				this.setState({ status: json.status });
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

	submitInteraction = (point) => {
		return fetch("http://10.84.105.122:3000/submitInteraction", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				location: this.state.id,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				// this.setState({ points: json });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	submitPlace = (point) => {
		return fetch("http://10.84.105.122:3000/submitPlace", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				location: this.state.where,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				// this.setState({ points: json });
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
				this.setState({ id: value });
			}
		} catch (e) {
			// error reading value
		}
	};

	componentDidMount() {
		this.getData();
		let geoOptions = {
			enableHighAccuracy: true,
			timeOut: 20000,
			maximumAge: 60 * 60 * 24,
		};
		this.setState({ ready: false, error: null });
		navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
		this.getPoints();
		this.getStatus();
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
				{this.state.error && <Text>{this.state.error}</Text>}
				{this.state.ready && this.state.pointsLoaded && (
					<View style={styles.container}>
						<MapView
							showsUserLocation={true}
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
						<Text style={{ backgroundColor: "#ffff00", padding: 10, marginTop: 440, marginLeft: 20, marginRight: 20, marginBottom: 20, fontSize: 20 }}>{this.state.status}</Text>
						<Button title="Learn More"></Button>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
