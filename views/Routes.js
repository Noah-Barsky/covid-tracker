import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import './MyLocation'
import MyLocation from './MyLocation'
import PreLogin from './PreLogin'
import Login from './Login'
import Signup from './Signup'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "PreLogin" component = {PreLogin} title = "Covid Tracker Home" initial = {true}/>
         <Scene key = "MyLocation" component = {MyLocation} title = "MyLocation"/>
         <Scene key = "Login" component = {Login} title = "Login"/>
         <Scene key = "Signup" component = {Signup} title = "Signup"/>
      </Scene>
   </Router>
)
export default Routes