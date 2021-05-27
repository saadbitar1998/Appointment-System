import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


import Home from '../components/Home/Home';
import Seller from '../components/Seller/Seller';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

const MainStack = () => {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="seller" component={Seller} options={{headerShown: false}}/>
            <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="signup" component={Signup} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default MainStack;