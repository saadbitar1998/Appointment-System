import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ip from '../../../util';

const Login = (props) => {

    const { navigation } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('login');

        fetch('http://' + ip + '/buyers/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            if (res.status === 422) {
              throw new Error('Validation failed.');
            }
            if (res.status !== 200 && res.status !== 201) {
              console.log('Error!');
              throw new Error('Could not authenticate you!');
            }
            return res.json();
        })
        .then(resData => {
            // set the token in the cookie
            console.log(resData.token);
            console.log(resData.userId);
            AsyncStorage.setItem('token', resData.token);
            AsyncStorage.setItem('userId', resData.userId);
            navigation.navigate('home');
        })
        .catch(err => {
            console.log(err);
        });
    }


    return (
        <View style={styles.container}>
        <Text style={styles.logo}>Appointment System</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}/>
        </View>
        <TouchableOpacity 
            style={styles.loginBtn}
            onPress={() => handleLogin()}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('signup')}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5C4FFD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        textAlign: 'center',
        fontWeight:"bold",
        fontSize:40,
        color:"#3acbf7",
        marginBottom:50
    },
    inputView:{
        width:"80%",
        backgroundColor:"white",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"black"
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#3acbf7",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    }
});