import React, {useState, useEffect} from 'react';
import {Spotify} from '../../util/Spotify/Spotify';

import './Login.css'

export const Login = () => {

    const [token, setToken] = useState(null);



    return (
        <div className="loginContainer">
            <h1>Up-lify</h1>
            <p className="welcome">Welcome to Up-lify! This app is optimized for better searching experience on Spotify. </p>
            <button>Proceed to Spotify login</button> {/* create condition, "if I got token already set" -> button "Open app" / else button "Proceed to Spotify login" */}
        </div>
    )
}