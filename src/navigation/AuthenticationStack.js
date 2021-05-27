import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import App from '../../App';
import Home from '../components/Home/Home';
import Seller from '../components/Seller/Seller';
import MainStack from './MainStack';
const AuthenticationStack = () => {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="Main" component={MainStack}/>
        </Stack.Navigator>
    );
}

export default AuthenticationStack;