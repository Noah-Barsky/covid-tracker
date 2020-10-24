import React from "react";
import { Router, Scene } from "react-native-router-flux";
import "./MyLocation";
import MyLocation from "./MyLocation";
import PreLogin from "./PreLogin";
import Login from "./Login";
import Signup from "./Signup";
import { View } from "react-native";

const Routes = () => (
	<Router>
		<Scene key="root" renderBackButton={() => <View></View>}>
			<Scene key="PreLogin" component={PreLogin} title="Covid Tracker Home" />
			<Scene key="MyLocation" component={MyLocation} title="Covid Tracker Home" />
			<Scene key="Login" component={Login} title="Login" />
			<Scene key="Signup" component={Signup} title="Signup" initial={true} />
		</Scene>
	</Router>
);
export default Routes;
