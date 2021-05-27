import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Login.css';
import validator from 'validator';

const Signup = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [error, setError] = useState('');


    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setDescriptionError('');
    }


    const handleSignup = () => {

        clearErrors();
        
        if (!validator.isEmail(email)) {
            setEmailError('Invalid Email');
        }
        if(password.length == 0){
            setPasswordError('Please Enter a valid password');
        }

        if(name.length == 0){
            setNameError('Please Enter a valid name');
        }

        if(description.length == 0){
            setDescriptionError('Please Enter a valid description');
        }

        if(validator.isEmail(email) && password.length > 0 && name.length > 0 && description.length > 0){

            fetch('http://localhost:8080/sellers/signup', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                    description: description,
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
                props.history.push('/login');
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
                    <label className="label">Name</label>
                    <input className="input" type="text" autoFocus required value={name} onChange={e=> setName(e.target.value)}/>
                    <p className="errorMsg">{nameError}</p>


                    <label className="label">Description</label>
                    <textarea className="input" type="text" autoFocus required value={description} onChange={e=> setDescription(e.target.value)}/>
                    <p className="errorMsg">{descriptionError}</p>


                    <label className="label">Email</label>
                    <input className="input" type="text" autoFocus required value={email} onChange={e=> setEmail(e.target.value)}/>
                    <p className="errorMsg">{emailError}</p>
                    
                    <label className="label">Password</label>
                    <input className="input" type="password" required value={password} onChange={e=> setPassword(e.target.value)}/>
                    <p className="errorMsg">{passwordError}</p>

                    <div className="btnContainer">
                        <button className="login-button" onClick={handleSignup}>Signup</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup;
