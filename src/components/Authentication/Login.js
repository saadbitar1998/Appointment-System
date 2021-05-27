import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Login.css';
import Cookie from "js-cookie";
import auth from '../../auth';
import validator from 'validator';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const [error, setError] = useState('');


    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
        setError('');
    }

    const handleLogin = () => {

        clearErrors();

        if (!validator.isEmail(email)) {
            setEmailError('Invalid Email');
        }
        if(password.length == 0){
            setPasswordError('Please Enter a valid password');
        }
        
        if(validator.isEmail(email) && password.length > 0) {
            fetch('http://localhost:8080/sellers/login', {
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
                Cookie.set("token", resData.token);
                Cookie.set("userId", resData.userId);
                props.history.push('/');
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            });
        }
    

    }

    return (
        <div>
            <Navbar {...props}/>
            <section className="login">
                <div className="loginContainer">
                    <label className="label">Email</label>
                    <input className="input" type="text" autoFocus required value={email} onChange={e=> setEmail(e.target.value)}/>
                    <p className="errorMsg">{emailError}</p>
                    <label className="label">Password</label>
                    <input className="input" type="password" required value={password} onChange={e=> setPassword(e.target.value)}/>
                    <p className="errorMsg">{passwordError}</p>
                    <div className="btnContainer">
                        <button className="login-button" onClick={handleLogin}>Login</button>
                    </div>
                    
                    {error ? <p className="errorMsg">Error: {error}</p> : null}
                
                </div>
            </section>
        </div>
    )
}

export default Login;
