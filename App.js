import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationStack from './src/navigation/AuthenticationStack';
import MainStack from './src/navigation/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './src/components/Login/Login';
import Signup from './src/components/Signup/Signup';

export default function App() {

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  AsyncStorage.getItem('userId')
    .then((value) => {
      console.log('userId: ', value);
      setUserId(value);
    })
  AsyncStorage.getItem('token')
    .then((value) => {
      console.log('token: ',value);
      setToken(value);
    })

  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
        {
          token ?
            <MainStack />
          :
            <Stack.Navigator initialRouteName="login">
              <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
              <Stack.Screen name="signup" component={Signup} options={{headerShown: false}}/>
              <Stack.Screen name="Main" component={MainStack} options={{headerShown: false}}/>
            </Stack.Navigator>
        }
    </NavigationContainer>

  );
}