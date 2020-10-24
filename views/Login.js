import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { Actions } from "react-native-router-flux";

const InputField = (props) => {
	const [value, onChangeText] = React.useState();

	return (
		<View>
			<Text>{props.type}</Text>
			<TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }} onChangeText={(text) => onChangeText(text)} value={value} />
			<Button style={styles.button} onPress={this.login} title="Log In" />
		</View>
	);
};

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return <View style={styles.container}></View>;
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
