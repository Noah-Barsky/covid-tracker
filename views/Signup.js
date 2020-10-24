import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Actions } from "react-native-router-flux";
import React, { useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";

const InputField = (props) => {
	const [value, onChangeText] = React.useState();

	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem("@id", value);
		} catch (e) {
			// saving error
		}
	};

	const createID = (email) => {
		return fetch("http://10.84.105.122:3000/createID", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				// console.log(json);
				storeData(json.id);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const login = (email) => {
		createID(email);
		Actions.MyLocation();
	};

	return (
		<View>
			<Text>{props.type}</Text>
			<TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }} onChangeText={(text) => onChangeText(text)} value={value} />
			<Button onPress={() => login(value)} title="Create Account" />
		</View>
	);
};

export default class Signup extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

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
		if (this.getData()) {
			Actions.MyLocation();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<InputField type="email" />
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
});
