import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import ip from '../../../util';

const Login = (props) => {

    const { navigation } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignup = () => {
        console.log('Signup handler');

        fetch('http://' + ip + '/buyers/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
        .then(res => {
            if (res.status === 422) {
              throw new Error(
                "Validation failed. Make sure the email address isn't used yet!"
              );
            }
            if (res.status !== 200 && res.status !== 201) {
              console.log('Error!');
              throw new Error('Creating a user failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <View style={styles.container}>
        {/* <Text style={styles.logo}>Appointment System</Text> */}

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Name..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setName(text)}/>
        </View>

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
            onPress={() => handleSignup()}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.loginText}>Login</Text>
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