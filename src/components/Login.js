import React, {useState} from "react";
import './CSS/Login.css';
import {Link, useHistory } from 'react-router-dom';
import {auth} from "../firebase";


const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(auth => {
            history.push('/')
        }).catch(err => alert(err.message));

    };

    const registerAccount = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(auth => {
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(err => alert(err.message))
    };

    return (
        <div className='login'>
            <Link to={'/'}>
                <img className='login__logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""/>
            </Link>
            <div className='login__container'>
                <h1>Sign In</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button className='login__signInButton' onClick={signIn}>Sign In</button>
                </form>

                <p>By Signing In, you agree to Amazon's Conditions of Use & Sale.
                    Please see our privacy notice, our cookies notice and our Interest-Based Ads Notice. </p>

                <button onClick={registerAccount} className='login__registerButton'>Create your Amazon Account</button>
            </div>


        </div>
    )
};

export default Login;
