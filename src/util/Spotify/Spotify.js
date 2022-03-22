import React, {useState} from 'react';

export const Spotify = () => {
    const redirectURL = 'http://localhost:3000/callback/';
    const clientID = 'e844090178ad411d93f568bd9d8038d0';
    const [accessToken, getAccessToken] = useState(null);

    // function to get access token
}