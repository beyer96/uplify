import React from 'react';

import './Login.css'

export const Login = (props) => {

    return (
        <div className="loginContainer">
            <h1>Up-lify</h1>
            <p className="welcome">Welcome to Up-lify! This app is optimized for better searching experience on Spotify. </p>
            <button onClick={props.handleLogin}>Login to Spotify and open the Up-lify app</button>
        </div>
    )
}