import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./views/Routes";
import MyLocation from "./views/MyLocation";

export default class App extends React.Component {
	componentDidMount() {
		// Load Bluetooth Settings Here
	}

	render() {
		return <Routes />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
