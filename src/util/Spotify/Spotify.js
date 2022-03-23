var accessToken;
const redirect = 'http://localhost:3000/';
const clientID = 'e844090178ad411d93f568bd9d8038d0';

const Spotify = {
    // get access token to use Spotify API
    getToken() {

        if(accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // clear parameters, to allow grabbing new access token when token expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            // window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const scope = "streaming user-read-playback-state playlist-modify-private playlist-read-private user-read-private";
            var state = generateRandomString(16);
            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(clientID);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect);
            url += '&state=' + encodeURIComponent(state);
            
            window.location = url;
        }
    }



    
}

// helper function, get random string of any length needed
function generateRandomString(number) {
    let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for(let x = 0; x < number; x++) {
        randomString += chars.charAt(Math.floor(Math.random() * number));
    }
    return randomString;
}

export {Spotify, accessToken};